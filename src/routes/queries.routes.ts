import { Router } from "express";
const router = Router();

import {
  getTemp,
  massiveCharge,
  deleteTemp,
  query1,
  query2,
  query9,
  query3,
  query5,
  query4,
  query7,
  cargarModelo,
  eliminarModelo,
  query8,
  query6,
} from "../controllers/queries.controllers";


// ===== DATA CHARGE =====
router.route("/cargarTemporal").post(massiveCharge); // Massive charge
router.route("/eliminarTemporal").delete(deleteTemp); // Delete temporal table
router.route("/cargarModelo").post(cargarModelo); // charge Model
router.route("/eliminarModelo").delete(eliminarModelo); // /eliminarModelo

// ====== QUERIES =======
router.route("/consulta1").get(query1); // Query 1
router.route("/consulta2").get(query2); // Query 2
router.route("/consulta3").get(query3); // Query 3
router.route("/consulta4").get(query4); // Query 4
router.route("/consulta5").get(query5); // Query 5
router.route("/consulta6").get(query6); // Query 6
router.route("/consulta7").get(query7); // Query 7
router.route("/consulta8").get(query8); // Query 8
router.route("/consulta9").get(query9); // Query 9

export default router;
