import * as yup from "yup";

export function  isValidEmail(email = "") {
    // const validator = yup.string().matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'dfsdfs');
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    try {
        let result: boolean;
        result = emailRegex.test(email);
        return result;
    } catch (error) {
        return false;
    }
}
