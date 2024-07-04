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

export function handleFormNumberError(key: string) {

    const ajvError = {
        keyword: 'type',
        dataPath: `.${key}`,
        schemaPath: `#/properties/${key}/type`,
        params: { type: 'string' },
        message: `${key} should be a number`
    };

    throw {
        status: 400,
        code: 'invalidDtoIn',
        message: 'DtoIn is not valid',
        validationError: [ajvError],
    };
}