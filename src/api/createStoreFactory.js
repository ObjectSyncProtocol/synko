import { createPatchFromMutations } from '../util/getset'
import { isFunction } from '../util/is'

export default function createStoreFactory(applyPatchFunction) {
    return function createStore(state) {
        const listeners = new Map()

        function subscribe(listener, filter) {
            listeners.set(listener, filter)
            return () => unsubscribe(listener) // This has become a kind of standard
        }

        function unsubscribe(listener) {
            listeners.delete(listener)
        }

        function applyPatch(patch_original) {
            const { mutations, result, unpatch } = applyPatchFunction(
                api.state,
                patch_original
            )
            api.state = result

            const outputs = Array.from(listeners.entries()).map(
                ([listener, filter]) => {
                    const mts = isFunction(filter)
                        ? mutations.filter(filter)
                        : mutations.slice(0)

                    const { patch, unpatch } = createPatchFromMutations(
                        mts,
                        patch_original
                    )
                    return {
                        listener,
                        patch,
                        unpatch,
                        mutations: mts,
                    }
                }
            )

            outputs.mutations = mutations
            outputs.unpatch = unpatch

            return outputs
        }

        const api = {
            state,
            listeners,
            subscribe,
            unsubscribe,
            applyPatch,
        }

        return api
    }
}
