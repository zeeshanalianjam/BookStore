import {Router} from 'express'
import { addBook, deleteBook, getAllBooks, getBookById, getRecentlyAddedBooks, getUserInforamtion, signInUser, signUpUser, updateAddress, updateBook } from '../controllers/user.controllers.js'
import { authenticateToken } from '../middlewears/userAuth.middlewears.js'

export const router = Router()

router.route("/sign-up").post(signUpUser)
router.route("/login").post(signInUser)
router.route("/get-user-information").get(authenticateToken, getUserInforamtion)
router.route("/update-address").put(authenticateToken, updateAddress)
router.route("/add-book").post(authenticateToken, addBook)
router.route("/update-book").put(authenticateToken, updateBook)  
router.route("/delete-book").delete(authenticateToken, deleteBook)
router.route("/get-all-books").get(getAllBooks)
router.route("/get-recent-books").get(getRecentlyAddedBooks)
router.route("/get-book-by-id/:id").get(getBookById)
