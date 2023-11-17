import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { NextFunction, Response } from 'express-serve-static-core'
import logger from '../utils/logger.js'
import { AccessTokenRequest, INickNameCreateReq, RegisterUserBody } from '../types/Types.js'
import mongoose from 'mongoose'

export const registration: RequestHandler<unknown, unknown, RegisterUserBody, unknown> = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body

        const emailExisted = await User.findOne({ email })

        if (!firstName || !lastName || !password) {
            return res.status(409).json({ message: 'Some parameters missing' })
        }

        if (emailExisted) {
            return res.status(409).json({ message: 'User with same email already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            firstName,
            lastName,
            email,
            nickName: '',
            password: hashedPassword,
        })

        await newUser.save()

        res.status(201).json({ message: `User with name ${firstName} has been registered` })
    } catch (error) {
        next(error)
    }
}

export const profile: RequestHandler = async (req: AccessTokenRequest, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.accessToken
        const userId = req.params.userId
        
        if (!mongoose.isValidObjectId(userId)) {

            logger.error('Invalid hero id')
            return res.status(400).json('Invalid hero id')
        }

        const user = await User.findById(userId)

        if (!user) {
            logger.error('User not found')
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(201).json(
            {
                accessToken,
                userInfo: {
                    fullName: user.firstName + ' ' + user.lastName,
                    nickName: user.nickName,
                    email: user.email,
                }
            })
    } catch (error) {
        next(error)
    }
}

export const createNickName = async (req: INickNameCreateReq, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.accessToken
        const _id = req.params.userId
        const { nickName} = req.body

        const user = await User.findById({ _id }).exec()
        const existNickName = await User.findOne({ nickName })
        
        if (!user) {
            logger.error('User not found')
            return res.status(400).json({message: 'User not found'})
        }
        
        if (existNickName) {
            return res.status(400).json({ message: 'User with same nickname already exist' })
        }
        
        user.nickName = nickName

        await user.save()
        
        res.status(201).json({
                accessToken,
                message: `Nickname ${user.nickName} has been created`,
                nickName: user.nickName
            })
    } catch (error) {
        next(error)
    }
}

export const updateEmail = async (req: AccessTokenRequest, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.accessToken
        const { oldEmail, newEmail } = req.body

        const email = oldEmail

        const user = await User.findOne({ email }).exec()
        const existEmail = await User.findOne({ newEmail }).exec() 

        if (!user) {
            logger.error('User not found')
            return res.status(404).json({ message: 'User not found' })
        }

        if (existEmail) {
            return res.status(409).json({ message: 'User with same email already exist' })
        }

        if (user.email === newEmail) {
            return res.status(409).json({ message: 'This account is register on same email' })
        }

        user.email = newEmail

        await user.save()

        res.status(201).json({
            accessToken,
            message: `Email of ${user.nickName} has been changed`,
        })
    } catch (error) {
        next(error)
    }
}