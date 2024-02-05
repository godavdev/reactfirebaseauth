import { AuthErrorCodes } from "firebase/auth"
const { EMAIL_EXISTS, INVALID_LOGIN_CREDENTIALS } = AuthErrorCodes

export const authErrorHandler = (error: any): undefined | string => {
    switch (error.code) {
        case EMAIL_EXISTS:
            return "This email is already in use."
        case INVALID_LOGIN_CREDENTIALS:
            return "Invalid credentials."
        default:
            console.log(error.code)
            return "Check your information"
    }
}
