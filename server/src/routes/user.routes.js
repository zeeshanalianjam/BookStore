import {Router} from 'express'
import { signInUser, signUpUser } from '../controllers/user.controllers.js'

export const router = Router()

router.route("/sign-up").post(signUpUser)
router.route("/login").post(signInUser)