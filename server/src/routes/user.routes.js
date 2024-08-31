import {Router} from 'express'
import { signUpUser } from '../controllers/user.controllers.js'

export const router = Router()

router.route("/sign-up").post(signUpUser)