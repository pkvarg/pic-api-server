import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// PUT api/email/contact

const transporter = () => {
  return nodemailer.createTransport({
    pool: true,
    host: 'smtp.titan.email',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.NODEJS_USERNAME,
      pass: process.env.NODEJS_PASSWORD,
    },
  })
}

const time = new Date()

const sendEmail = asyncHandler(async (req, res) => {
  const { name, email, phone, mailMessage } = req.body

  try {
    const userMailData = {
      from: process.env.EMAIL_FROM,

      to: `${email}`,
      bcc: process.env.NODEJS_BCC,

      subject: `Správa od ${name}`,
      html: `<div>
      <p>Dobrý deň,</p>
      <p>Ďakujeme Vám za Váš email.</p>
      
      <p>meno: ${name}</p>
      <p>email: ${email}</p>
      <p>telefón: ${phone}</p>   
      <p>Vaša správa: ${mailMessage}</p>    
  
      <p>čas: ${time}</p>
      </div>`,
    }
    transporter().sendMail(userMailData)
    res.json({ status: 'Success' })
  } catch (error) {
    res.json({ status: 'Error', error })
  }
})

export { sendEmail }
