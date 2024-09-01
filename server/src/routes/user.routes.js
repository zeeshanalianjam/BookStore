import {Router} from 'express'
import { addBook, getUserInforamtion, signInUser, signUpUser, updateAddress } from '../controllers/user.controllers.js'
import { authenticateToken } from '../middlewears/userAuth.middlewears.js'

export const router = Router()

router.route("/sign-up").post(signUpUser)
router.route("/login").post(signInUser)
router.route("/get-user-information").get(authenticateToken, getUserInforamtion)
router.route("/update-address").put(authenticateToken, updateAddress)
router.route("/add-book").post(authenticateToken, addBook)