import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (text) => {
    try {
        let transporter;

        if (process.env.MAILTRAP_TOKEN) {
            // Mailtrap (testing)
            transporter = nodemailer.createTransport(
                MailtrapTransport({
                    token: process.env.MAILTRAP_TOKEN,
                })
            );
        } else {
            // SMTP (production)
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_PORT == 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
        }

        await transporter.sendMail({
            from: process.env.MYMAIL,
            to: process.env.MYMAIL,
            subject: "CONTACT REQUEST FROM PORTFOLIO",
            text,
        });

        console.log("Email sent successfully!");
    } catch (err) {
        console.error("Failed to send email:", err);
    }
};
