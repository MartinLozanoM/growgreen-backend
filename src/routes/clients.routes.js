import { Router } from "express";
import {
  getClientsController,
  createClientController,
  updateClientController,
  deleteClientController,
  getClientController,
} from "../controllers/clients.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createClientSchema } from "../schemas/client.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/clients", authRequired, getClientsController);
router.get("/clients/:id", authRequired, getClientController);
router.post(
  "/clients",
  validateSchema(createClientSchema),
  createClientController
);
router.put("/clients/:id", authRequired, updateClientController);
router.delete("/clients/:id", authRequired, deleteClientController);

export default router;
