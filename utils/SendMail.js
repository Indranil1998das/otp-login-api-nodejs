import nodemailer from "nodemailer";
const SendMail = async (email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SENDEMAIL_SERVICE,
      auth: {
        user: process.env.SENDEMAIL_COMPANY_GAMIL_ID,
        pass: process.env.SENDEMAIL_COMPANY_GAMIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SENDEMAIL_COMPANY_GAMIL_ID,
      to: email,
      subject: "Email Varification",
      text: message,
    });
  } catch (error) {
    throw error;
  }
};
export default SendMail;
