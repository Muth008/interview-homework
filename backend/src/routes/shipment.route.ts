import express from "express";
import listShipments from "../services/shipment/list.service";
import getShipment from "../services/shipment/get.service";
import createShipment from "../services/shipment/create.service";
import updateShipment from "../services/shipment/update.service";
import deleteShipment from "../services/shipment/delete.service";

const router = express.Router();

router.post("/list", async (req, res) => {
    await listShipments(req, res);
});

router.get("/", async (req, res) => {
    await getShipment(req, res);
});

router.post("/", async (req, res) => {
    await createShipment(req, res);
});

router.put("/", async (req, res) => {
    await updateShipment(req, res);
});

router.delete("/", async (req, res) => {
    await deleteShipment(req, res);
});

export default router;