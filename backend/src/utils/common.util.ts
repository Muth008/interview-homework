import { handleFormNumberError } from "./ajv.util";

/**
 * Convert string numbers in the request body data to numbers.
 * (handling string numbers from form data)
 */
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

/**
 * Generate a random shipmentId.
 */
export function generateShipmentId() {
    return Math.random().toString(16).slice(2);
}