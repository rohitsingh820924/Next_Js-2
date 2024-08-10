import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModal"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/heplers/mailer'


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);
        
        // check if user exist
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json({error: "user already exist"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        // save user in database

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // Send Verification Email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json(
            {message: "Created user successfully",
                success: true,
                savedUser
            },
            {status: 200}
        )

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}