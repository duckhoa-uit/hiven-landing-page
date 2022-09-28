let nodemailer = require('nodemailer');

export const config = {
   api: {
      bodyParser: true,
   },
};

async function emailHandler(req, res) {
   const transporter = nodemailer.createTransport({
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST,
      auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAIL_APP_PASSWORD,
      },
      secure: process.env.EMAIL_SSL,
   });

   const mailData = {
      from: `Hiven`,
      to: req.body.receiveEmail,
      subject: `[Hiven] New Contact Submission From ${req.body.name}`,
      html: `
      <div><strong>Full Name:</strong> ${req.body.name}</div>
      <br/>
      <div><strong>Email:</strong> ${req.body.email}</div>
      <br/>
      <div><strong>Phone:</strong> ${req.body.phoneNumber}</div>
      <br/>
      <div><strong>Message:</strong><br/> ${
         req.body.message.includes('\n')
            ? req.body.message.replace(/\n/g, '<br />')
            : req.body.message
      }</div>
      <br/>
      <p>Sent from: ${req.body.email}</p>`,
   };

   await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, function (err, info) {
         if (err) {
            reject(err);
         } else {
            resolve(info);
         }
      });
   });
   res.status(200).json({ status: 'OK' });
}

export default emailHandler;
