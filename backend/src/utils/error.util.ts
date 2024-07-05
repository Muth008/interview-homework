import { Response } from 'express';

/**
 * Handle not found error. Return an error object with status 404.
 */
export function handleNotFound(type: string, id: number) {
    throw {
        status: 404,
        code: type + "NotFound",
        message: type.charAt(0).toUpperCase() + type.slice(1) + ` with id ${id} not found`,
    };
}

/**
 * Create an error object with status 500 and a message that
 * describes the error that occurred during handling specific object.
 */
export function createError(type: string, objectName: string) {
    return {
        status: 500,
        code: objectName + type + "Failure",
        message: `There was an error during handling ${objectName}. It is not possible to ${type.toLowerCase()} ${objectName}.`,
    };
}

/**
 * Handle upload error. Return an error object with original status or 500.
 */
export function handleUploadError(err: any, res: Response) {
    return res.status(err.status ?? 500).json({
      code: 'fileUploadFailure',
      message:
        'There was an error during file upload. It is not possible to upload file.',
    });
  }