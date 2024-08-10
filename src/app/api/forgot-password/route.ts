import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModal"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/heplers/mailer'


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody;

        console.log(reqBody);
        
        // check if user exist
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "user doen't exist"}, {status: 400})
        }

        // Send Reset Email
        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json(
            {message: "Reset mail sent successfully",
                success: true,
            },
            {status: 200}
        )

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}