import { default as Ajv } from "ajv";
import addFormats from "ajv-formats";

export const ajv = new Ajv();
addFormats(ajv);

export function handleValidationError(ajv: Ajv) {
    throw {
        status: 400,
        code: 'invalidDtoIn',
        message: 'DtoIn is not valid',
        validationError: ajv.errors,
    };
}