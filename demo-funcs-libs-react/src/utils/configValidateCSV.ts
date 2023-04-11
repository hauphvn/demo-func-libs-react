import {
    isValidEmail,
} from "./validatorCSV";

export const configValidateCSV = {
    headers: [
        {
            name: "Username",
            inputName: "username",
            required: true,
            // requiredError: (headerName, rowNumber, columnNumber) => {
            //     return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
            // }

        },
        {
            name: "Age",
            inputName: "age",
            required: true
        },
        {
            name: "Email",
            inputName: "email",
            required: true,

            validate: (email: string) => {
                return isValidEmail(email);
            },
            validateError: (headerName:string , rowNumber: number, columnNumber: number) => {
                return `${headerName} is validate in the ${rowNumber} row / ${columnNumber} column`;
            }


        },
    ]
};
