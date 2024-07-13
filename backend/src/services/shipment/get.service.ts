import { ajv, handleValidationError } from "../../utils/ajv.util";
import getShipmentSchema from "../../schema/shipment/get.schema";
import { createError, handleNotFound } from "../../utils/error.util";
import { Request, Response } from 'express';
import { shipmentDAO } from "../../dao/daoInit";

async function getShipment(req: Request, res: Response) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getShipmentSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const shipment = await shipmentDAO.getShipmentById(Number(reqParams.id));

        if (!shipment) handleNotFound('shipment', reqParams.id);

        res.json(shipment);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Get', 'shipment')});
    }
}

export default getShipment;
