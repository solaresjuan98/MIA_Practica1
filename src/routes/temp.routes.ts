
import { Router } from 'express';
const router = Router();


import {getTemp, massiveCharge} from '../controllers/temp.controllers'


router.route('/temp').get(getTemp);     // Test route
router.route('/cargarTemporal').post(massiveCharge);    // Massive charge


export default router;