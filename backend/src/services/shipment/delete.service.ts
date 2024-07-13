import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteShipmentSchema from "../../schema/shipment/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";
import { handleProductsQuantities } from "../../utils/product.util";
import { convertStringsToNumbers } from "../../utils/common.util";
import { shipmentDAO } from "../../dao/daoInit";

async function deleteShipment(req: Request, res: Response) {
    try {
        const query = req.query;

        // Validate request query
        const valid = ajv.validate(deleteShipmentSchema, query);
        if (!valid) handleValidationError(ajv);

        // Convert string number to actual number
        convertStringsToNumbers(query, ['id'])

        handleProductsQuantities(Number(query.id))

        const shipment = await shipmentDAO.deleteShipment(Number(query.id));
        res.json(shipment);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'shipment')});
    }
}

export default deleteShipment;
