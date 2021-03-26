
import { Router } from 'express';
const router = Router();


import { test } from '../controllers/index.controllers';


router.route('/').get(test);


export default router;