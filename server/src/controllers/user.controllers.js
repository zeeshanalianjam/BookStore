import { apiResponse } from "../utils/apiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Books } from "../models/Books.models.js";

// signUp api
export const signUpUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (name.length < 4) {
      return res
        .status(400)
        .json(new apiResponse(400, {}, "Name length should be greater than 3"));
    }

    const existingName = await User.findOne({ name });

    if (existingName) {
      return res
        .status(409)
        .json(new apiResponse(409, {}, "Name already exists!"));
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(409)
        .json(new apiResponse(409, {}, "Email already exists!"));
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json(
          new apiResponse(400, {}, "Password's length should be greater than 5")
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });

    const newUser = await user.save();

    res
      .status(200)
      .json(new apiResponse(200, newUser, "User created successfully..."));
  } catch (error) {
    res
      .status(500)
      .json(new apiResponse(500, {}, "Internal Server Error "), error);
  }
});

// signIn api
export const signInUser = asyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      return res
        .status(400)
        .json(new apiResponse(400, {}, "Inavlid Credentials!"));
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.name },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRY_KEY,
        });
        res
          .status(200)
          .json(
            new apiResponse(
              200,
              { user: existingUser, token },
              "User login successfully..."
            )
          );
      } else {
        res.status(400).json(new apiResponse(400, {}, "Inavlid Credentials!"));
      }
    });
  } catch (error) {
    console.log("ERROR in Internal Server in SignIn user error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// getUserInforamtion api
export const getUserInforamtion = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;

    const data = await User.findById(id).select("-password");

    return res.status(200).json(data);
  } catch (error) {
    console.log(
      "ERROR in Internal Server in get user information error:  ",
      error
    );

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// update address api
export const updateAddress = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    await User.findByIdAndUpdate(id, { address: address });

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Address updated successfully..."));
  } catch (error) {
    console.log("ERROR in Internal Server in update address error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// addBook api
export const addBook = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res
        .status(400)
        .json(
          new apiResponse(
            400,
            {},
            "You are not having access to perform admin work!"
          )
        );
    }

    const book = new Books({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();

    res
      .status(200)
      .json(new apiResponse(200, book, "Book added successfully..."));
  } catch (error) {
    console.log("ERROR in Internal Server in addBook  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// updateBook api
export const updateBook = asyncHandler(async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Books.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    //  response
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Book updated successfully..."));
  } catch (error) {
    console.log("ERROR in Internal Server in updateBook  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// deleteBook api
export const deleteBook = asyncHandler(async (req, res) => {
  try {
    const { bookid } = req.headers;
   const myBook = await Books.findByIdAndDelete(bookid);
    // validation of bookid are exist or not
    if (!myBook) {
      return res
       .status(404)
       .json(new apiResponse(404, {}, "Book not found!"));
    }

    //  response
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Book deleted successfully..."));
  } catch (error) {
    console.log("ERROR in Internal Server in deleteBook  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// get all books api
export const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Books.find({});

    return res.status(200).json(
      new apiResponse(200, books, "All books fetched successfully...")
    );
  } catch (error) {
    console.log("ERROR in Internal Server in getAllBooks  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// get recently added books limit 4 api
export const getRecentlyAddedBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Books.find({})
     .sort({ createdAt: -1 })
     .limit(4);

    return res.status(200).json(
      new apiResponse(200, books, "Recently added books fetched successfully...")
    );
  } catch (error) {
    console.log("ERROR in Internal Server in getRecentlyAddedBooks  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});

// get book by id api
export const getBookById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);

    // validation of bookid are exist or not
    if (!book) {
      return res
       .status(404)
       .json(new apiResponse(404, {}, "Book not found! or Invalid id"));
    }

    //  response
    return res.status(200).json(
      new apiResponse(200, book, "Book fetched successfully...")
    );
  } catch (error) {
    console.log("ERROR in Internal Server in getBooksById  error:  ", error);

    res.status(500).json(new apiResponse(500, {}, "Internal Server Error "));
  }
});
