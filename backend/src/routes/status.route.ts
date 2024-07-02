import express from "express";
import listStatuss from "../services/status/list.service";
import getStatus from "../services/status/get.service";
import createStatus from "../services/status/create.service";
import updateStatus from "../services/status/update.service";
import deleteStatus from "../services/status/delete.service";

const router = express.Router();

router.post("/list", async (req, res) => {
    await listStatuss(req, res);
});

router.get("/", async (req, res) => {
    await getStatus(req, res);
});

router.post("/", async (req, res) => {
    await createStatus(req, res);
});

router.put("/", async (req, res) => {
    await updateStatus(req, res);
});

router.delete("/", async (req, res) => {
    await deleteStatus(req, res);
});

export default router;
