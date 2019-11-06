export default function factoryDelete() {
    const key = '$delete'

    // Constructor/Creator
    function Delete() {
        if (!(this instanceof Delete)) {
            return new Delete()
        }
    }

    // Mandatory
    Delete.key = key

    // Mandatory
    Delete.isValidToStringify = function(value) {
        return value instanceof Delete
    }

    // Mandatory
    Delete.stringify = function() {
        return { [key]: 1 }
    }

    // Mandatory
    Delete.isValidToParse = function(value) {
        return value[key] === 1
    }

    // Mandatory
    Delete.parse = function() {
        return new Delete()
    }

    // Optionals
    // Delete.beforeStringify = ()=>{}
    // Delete.afterStringify = ()=>{}
    // Delete.beforeParse = ()=>{}
    // Delete.afterParse = ()=>{}
    // Delete.skipStringify = ()=>{}
    // Delete.skipParse = ()=>{}

    return Delete
}
