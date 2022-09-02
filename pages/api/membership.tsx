import excuteQuery from 'lib/db';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      let nodemailer = require('nodemailer');
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
          name: req.body.email,
          address: 'info@juedische-stimme.com',
        },
        replyTo: req.body.email,
        to: 'info@juedische-stimme.com',
        subject: `Membership application`,
        text: req.body.message,
        html: `<div><ul> <li>${req.body.birthdate}</li>
        <li>${req.body.street}</li>
        <li>${req.body.postcode}</li>
        <li>${req.body.location}</li>
        <li>${req.body.tel}</li>
        <li>${req.body.email}</li>
        </ul></div>`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
          res.json({ type: 'error', error: err });
        } else {
          console.log(info);
          res.json({ type: 'success', info: info });
        }
      });
    } else {
      res.json({ message: 'NO GET HERE!' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
