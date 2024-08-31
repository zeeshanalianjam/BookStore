export class apiResponse {
    constructor(statusCode, data, message= "Success", success){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success
    }
}