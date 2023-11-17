import { registration, profile, createNickName, updateEmail } from '../controller/user.controller.js';
import { Router } from 'express'
import {jwtVerify} from '../middleware/jwtVerify.middleware.js';

const router = Router()
router.post('/api/user/registration', registration)
router.get('/api/user/:userId', jwtVerify, profile)
router.put('/api/user/:userId', jwtVerify, createNickName)
router.put('/api/user', jwtVerify, updateEmail)

export default router