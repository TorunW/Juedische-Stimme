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
          address: 'info@juedische-stimme.com',
        },
        replyTo: req.body.email,
        to: ['info@juedische-stimme.com','mail@juedische-stimme.de'],
        subject: `Membership application`,
        text: req.body.firstname,
        html: `<div>
        <p><span>Firstname: </span><span>${req.body.firstname}</span></p>
        <p><span>Lastname: </span><span>${req.body.lastname}</span></p>
        <p><span>Birtdate: </span><span>${req.body.birthdateDay}/${req.body.birthdateMonth}/${req.body.birthdateYear}</span></p>
        <p><span>Address:</span></br>
        <span>${req.body.street} ${req.body.streetNr}</span></br>
        <span>${req.body.zipcode} ${req.body.city}</span></p>
        <p><span>Telephone: </span><span>${req.body.tel}</span></p>
        <p><span>Email: </span><span>${req.body.email}</span></p>
        </div>
        `,
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
      // res.json({ message: 'membership form sent!' });
    } else {
      res.json({ message: 'NO GET HERE!' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
