import bcrypt from 'bcrypt'
import User from '../model/users.js'
import mongoose from 'mongoose';
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken
} from '../libs/jwt.js';
const ObjectId = mongoose.Types.ObjectId

const register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        //check required field
        if (!username || !password) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'please fill all the required field'
            });
        }

        //check duplicated username
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'username was used'
            });
        }
        const newUser = await User.create({
            username: username,
            password: password.toString()
        });

        //create access token and refresh token
        const accessToken = createAccessToken(newUser._id);
        const refreshToken = createRefreshToken(newUser._id)

        //send cookie with contain refresh token
        res.cookie("refreshToken", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
        });

        res.status(201).json({
            status: 201,
            message: 'success',
            username: username,
            accessToken: accessToken
        });

    } catch (err) {
        next(err)
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        //check required field
        if (!username || !password) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'please fill all the required field'
            });
        }

        //check username is exist
        const user = await User.findOne({ username })

        //when username is not found
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'username is invalid'
            });
        }

        //compare the password
        const hashPassword = await bcrypt.compare(password.toString(), user.password)
        //when password is not match
        if (!hashPassword) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'password is invalid'
            });
        }

        //create access token and refresh token
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        //send cookie with contain refresh token 
        res.cookie("refreshToken", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
        });

        res.status(200).json({
            status: 200,
            message: 'success',
            username: username,
            accessToken: accessToken
        });

    } catch (err) {
        next(err)
    }
};

const logout = async (req, res, next) => {
    try {
        //clear cookie refresh token
        res.clearCookie('refreshToken', { path: '/' })
        res.status(200).json({
            status: 200,
            message: 'success',
            info: 'successfully logout'
        })
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json({
            status: 200,
            message: 'success',
            data: user
        })
    } catch (err) {
        next(err)
    }
}


const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        //check ObjectId is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'user not found'
            });
        }
        //check username is exist
        const user = await User.findOne({ _id: id })
        //when username is not found
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'user not found'
            });
        }

        const deletedUser = await User.deleteOne({ _id: id })
        //when no one user is deleted
        if (deletedUser.deletedCount === 0) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'user not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'success',
            data: 'successfully deleted user'
        })
    } catch (err) {
        next(err)
    }
}

const checkRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        //when admin not sent cookie refresh token
        if (!refreshToken) {
            return res.status(401).json({
                status: 401,
                message: 'failed',
                info: 'forbidden'
            });
        }
        verifyRefreshToken(refreshToken, (error, decoded) => {
            if (error) {
                console.log(error)
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'forbidden'
                });
            }
            const accessToken = createAccessToken(decoded.id, decoded.role)
            res.status(200).json({
                status: 200,
                message: 'success',
                accessToken: accessToken
            });
        })
    } catch (err) {
        next(err)
    }
}

const adminController = {
    login,
    logout,
    register,
    getUser,
    deleteUser,
    checkRefreshToken
}

export default adminController