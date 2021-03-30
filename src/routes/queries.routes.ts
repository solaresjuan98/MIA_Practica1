
import { Router } from 'express';
const router = Router();


import {getTemp, massiveCharge, deleteTemp, query1, query2, query9} from '../controllers/queries.controllers'


router.route('/temp').get(getTemp);                     // Test route
router.route('/cargarTemporal').post(massiveCharge);    // Massive charge
router.route('/eliminarTemporal').delete(deleteTemp);   // Delete temporal table
router.route('/consulta1').get(query1);                 // Query 1
router.route('/consulta2').get(query2);                 // Query 2 
router.route('/consulta9').get(query9);                 // Query 9
export default router;