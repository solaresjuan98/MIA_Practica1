
import { Router } from 'express';
const router = Router();


import {getTemp, massiveCharge, deleteTemp, query1} from '../controllers/temp.controllers'


router.route('/temp').get(getTemp);                     // Test route
router.route('/cargarTemporal').post(massiveCharge);    // Massive charge
router.route('/eliminarTemporal').delete(deleteTemp);   // Delete temporal table
router.route('/consulta1').get(query1);                 // Query 1
export default router;