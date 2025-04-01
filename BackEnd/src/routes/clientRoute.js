import express from "express";

import * as clientController from "../controllers/clientController.js";

const router = express.Router();

router.get("/clients", clientController.getClients);
router.post("/add-client", clientController.postClient);
router.put("/update-client/:id", clientController.updateClient);
router.put("/delete/:id", clientController.deleteClient);
router.get("/clients/search", clientController.searchClient);

export default router;
