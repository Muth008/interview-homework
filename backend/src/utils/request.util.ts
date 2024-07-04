import { handleFormNumberError } from "./ajv.util";

export function convertStringsToNumbers(body: any, keys: string[]) {
    keys.forEach(key => {
        if (body[key]) {
            let converted = Number(body[key]);
            if (isNaN(converted)) {
                handleFormNumberError(key);
            }
            body[key] = converted;
        }
    });
    
}
