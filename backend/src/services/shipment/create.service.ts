import { ajv, handleValidationError } from "../../utils/ajv.util";
import { createError } from "../../utils/error.util";
import createShipmentSchema from "../../schema/shipment/create.schema";
import { Request, Response } from 'express';
import { 
    GENERATE_ID_MAX_ATTEMPTS, 
    PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE 
} from "../../constants/shipment.constants";
import { handleProductsQuantities } from "../../utils/product.util";
import { generateShipmentId } from "../../utils/common.util";
import { shipmentDAO } from "../../dao/daoInit";

async function createShipment(req: Request, res: Response) {
    try {
        let body = req.body;

        // Validate request body
        const valid = ajv.validate(createShipmentSchema, body);
        if (!valid) handleValidationError(ajv);

        // Increase and decrease the quantity of products in the warehouse
        handleProductsQuantities(undefined, body.products)

        const shipment = await createShipmentWithRetry(body);
        res.json(shipment);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Create', 'shipment') });
    }
}

/**
 * Try to create a shipment with the generated shipmentId.
 * If the shipmentId already exists, try to generate a new one.
 */
export async function createShipmentWithRetry(body: any) {
    let attempt = 0;
    let shipment;

    while (attempt < GENERATE_ID_MAX_ATTEMPTS) {
        try {
            body.shipmentId = generateShipmentId();
            body.shipmentDate = new Date(body.shipmentDate);
            
            shipment = await shipmentDAO.createShipment(body);
            break;
        } catch (err: any) {
            if (err.code === PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE && attempt < GENERATE_ID_MAX_ATTEMPTS - 1) {
                // If the shipmentId already exists, try to generate a another one
                body.shipmentId = generateShipmentId();
                attempt++;
            } else {
                // If it's not a Unique constraint error or we've reached the max attempts, throw the error
                throw err;
            }
        }
    }
    if (!shipment) throw createError('Create', 'shipment');

    return shipment;
}

export default createShipment;
