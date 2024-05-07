class ApiErrors extends Error {
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        // data is always sets to null
        this.data = null
        this.success = false
        this.errors = errors
        this.message = message

        if (stack) {
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiErrors}