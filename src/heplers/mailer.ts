import User from "@/models/userModal"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        const hasedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hasedToken,
                    VerifyTokenExpiry: Date.now() + 3600000
                }                
            )
        }

        else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hasedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a8199091a7ae30",
              pass: "b0ac7376add81d"
            }
          });

        const mailOptions = {
            from: 'rohitsingh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.domain}/${emailType ==="VERIFY" ? "verifyemail" : "resetemail"}?token=${hasedToken}">here</a> to ${emailType ==="VERIFY" ? "Verify your email" : "Reset your password"}<p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}