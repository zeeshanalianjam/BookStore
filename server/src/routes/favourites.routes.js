import {Router} from 'express'
import { addToFavourite } from '../controllers/favourites.controllers.js'
import { authenticateToken } from '../middlewears/userAuth.middlewears.js'


export const favouriteRouter = Router()

// Add your favourite routes here

favouriteRouter.route("/add-favourite").put(authenticateToken, addToFavourite)
favouriteRouter.route("/get-all-favourites").get(/* Add your route handler */)
favouriteRouter.route("/remove-favourite").delete(/* Add your route handler */)

// Add your favourite routes here
