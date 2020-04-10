export default function localProcedureCall(fn, req, args) {
    try {
        const output = fn.apply(req, args)
        if (output !== req) {
            output instanceof Promise
                ? output.then(req.resolve).catch(req.reject)
                : req.resolve(output)
        }
    } catch (error) {
        // https://airbrake.io/blog/nodejs-error-handling/nodejs-error-class-hierarchy
        if (error instanceof Error) throw error
        req.reject(error)
    }
}