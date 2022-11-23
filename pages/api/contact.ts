import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      let nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        port: 465,
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: true,
        // tls: {
        //     ciphers:'SSLv3'
        // }
      });

      const mailData = {
        from: {
          address: "mail@juedische-stimme.de",
        },
        replyTo: req.body.email,
        to: ["mail@juedische-stimme.de"],
        subject: `Contact Message From ${req.body.name}`,
        text: req.body.message,
        html: `<div>${req.body.message}</div>`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          res.json({ type: "error", error: err });
        } else {
          res.json({ type: "success", info: info });
        }
      });
    } else {
      res.json({ message: "NO GET HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
