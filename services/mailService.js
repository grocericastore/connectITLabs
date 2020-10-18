const nodemailer = require("nodemailer");

async function sendMail(body) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'siddhantgupta89@gmail.com',
            pass: 'Siddh@865',
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"Connect IT Labs" <siddhantgupta89@gmail.com>',
            to: body.email,
            subject: "Query from website",
            text: body.subject,
            html: `<b>${body.subject}</b>
            <br> Below are the details of user query:<br><br>
            <p style='font-weight: bold; color: #2F4F4F'>NAME: </p> ${body.name}<br>
            <p style='font-weight: bold; color: #2F4F4F'>EMAIL: </p> ${body.email}<br>
            <p style='font-weight: bold; color: #2F4F4F'>PHONE: </p> ${body.phone}<br>
            <p style='font-weight: bold; color: #2F4F4F'>MESSAGE: </p> ${body.message}<br>`,
        });
        console.log(`Mail sent successfully: ${info.messageId}`);

    } catch (e) {
        console.error(`Unable to send mail: ${e}`);
        return null;
    }
}

module.exports = { sendMail };