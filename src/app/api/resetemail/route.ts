import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        // Validate inputs
        if (!token || !newPassword) {
            return NextResponse.json({ error: "Token and new password are required." }, { status: 400 });
        }

        const user = await User.findOne({ 
            forgotPasswordToken: token, 
            forgotPasswordTokenExpiry: { $gt: Date.now() } 
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        // Reset password and clear the reset token
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password Reset Successfully", success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Error resetting password:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
