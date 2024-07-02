/**
 * @openapi
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 description: The validation keyword that failed.
 *               dataPath:
 *                 type: string
 *                 description: The path to the part of the data that was invalid.
 *               schemaPath:
 *                 type: string
 *                 description: The path to the part of the schema that failed.
 *               params:
 *                 type: object
 *                 description: Additional information about why the validation failed.
 *               message:
 *                 type: string
 *                 description: A human-readable error message.
 *           description: An array of errors that occurred during validation.
 *       required:
 *         - errors
 *       description: An object representing a validation error from AJV.
 */ 