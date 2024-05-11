import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiErrors} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username: email
    // check for images, check for avatar
    // upload then on cloudinary, avatar
    // create user object - create a entry in db
    // remove password and refresh token fields from respone
    // check user creation
    // return res

    const {email, username, fullName, password} = req.body
    console.log("email:", email)

    if (
        [email, username, fullName, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiErrors(400, "All fiedls are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })
    
    if(existedUser){
        throw new ApiErrors(409, "User with this email and username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiErrors(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiErrors(400, "avatar is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiErrors(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user regiustered successfully")
    )

})

export {registerUser}