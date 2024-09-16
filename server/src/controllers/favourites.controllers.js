import { User } from "../models/user.models.js";
import { apiResponse } from "../utils/apiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";



// add book to favourite api
export const addToFavourite = asyncHandler(async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // check if user already added this book
        const userData = await User.findById(id);

        const isBookFavourite = await userData.favourites.includes(bookid)

        if (isBookFavourite) {
            return res.status(400).json(new apiResponse(400, {}, "Book already in your favourites"));
        }

        // add book to user's favourites
        await User.findByIdAndUpdate(id, {
            $push: { favourites: bookid }
        })


        return res
            .status(200)
            .json(
                new apiResponse(200, {}, "Book added to your favourites successfully")
            );

    } catch (error) {
        console.log("ERROR in addToFavourite : ", error);
        return res.status(500).json(new apiResponse(500, {}, "Internal Server Error"));
    }

});

// remove book from favourite api