/**
 * Warehouse API
 * API endpoints for a warehouse services documented on swagger
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: jorge.sindelar@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ValidationErrorErrorsInner { 
    /**
     * The validation keyword that failed.
     */
    keyword?: string;
    /**
     * The path to the part of the data that was invalid.
     */
    dataPath?: string;
    /**
     * The path to the part of the schema that failed.
     */
    schemaPath?: string;
    /**
     * Additional information about why the validation failed.
     */
    params?: object;
    /**
     * A human-readable error message.
     */
    message?: string;
}
