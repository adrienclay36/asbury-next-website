const nodemailer = require("nodemailer");


export default async function handler(req, res) {
    if(req.method === 'POST') {
        try {
            const { recipientList, subject, message } = req.body;

            const transport = nodemailer.createTransport({
              host: "smtp.office365.com",
              port: 587,
              secure: false,
              auth: {
                user: process.env.NEXT_PUBLIC_ASBURY_EMAIL,
                pass: process.env.NEXT_PUBLIC_ASBURY_PASSWORD,
              },
              tls: {
                ciphers: "SSLv3",
              },
            });
    
            const info = await transport.sendMail({
                from: `"Asbury Webmaster", <${process.env.NEXT_PUBLIC_ASBURY_EMAIL}>`,
                to: recipientList,
                subject: subject,
                html: message,
            })
            res.status(200).json({ status: 'ok' });
            return;
        } catch (error) { 
            console.log(error.message);
            res.status(500).json({ statusCode: 500, message: error.message });
            return;
        }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method not allowed");
    }
}