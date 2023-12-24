import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import Attachments from '../models/md_sentModel.js'
import Emails from '../models/md_emails.js'
import niceInvoice from '../utils/niceinvoice.js'
import path from 'path'
const __dirname = path.resolve()

// PUT api/md/email

const transporter = () => {
  return nodemailer.createTransport({
    pool: true,
    host: 'smtp.titan.email',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.MD_USERNAME,
      pass: process.env.MD_PASSWORD,
    },
  })
}

const id = '658019e8cd64f608c5d2cc4f'

const getAttachmentsCount = async (req, res) => {
  const attachments = await Attachments.findById(id)
  if (attachments) {
    const counted = attachments.attachmentsCount
    res.json(counted)
  }
}

// function to Increase attachments count in db

const incAttachmentsCount = async () => {
  const attachments = await Attachments.findById(id)
  if (attachments) {
    attachments.attachmentsCount = attachments.attachmentsCount + 1
    await attachments.save()
    const counted = attachments.attachmentsCount
    return counted
  }
}

const saveDownloadsEmail = async (req, res) => {
  const { email } = req.body
  const checkDb = await Emails.findOne({ downloads: email })
  if (checkDb) {
    res.json('email already exists')
  } else {
    const addEmail = new Emails({
      downloads: email,
    })
    const createdEmail = await addEmail.save()
    res.json(createdEmail)
  }
}

const getEmails = async (req, res) => {
  const emails = await Emails.find({})
  res.json(emails)
}

const time = new Date()

const sendEmail = asyncHandler(async (req, res) => {
  const addAttachNumber = await incAttachmentsCount()

  const {
    flatOrHouse,
    city,
    street,
    houseNumber,
    countRooms,
    houseCondition,
    squareMeters,
    allFloorsCount,
    currentFloorNumber,
    hasElevator,
    hasBalcony,
    hasLoggia,
    hasTerrace,
    hasBasement,
    hasGarage,
    hasParking,
    builtYear,
    hasIsolation,
    hasNewElevator,
    hasNewWindows,
    hasNewInstallations,
    hasThermostat,
    hasInternet,
    hasAlarm,
    hasAirCon,
    urbanQuality,
    monthlyCosts,
    email,
    price,
  } = req.body

  const skObj = {
    flatOrHouse: flatOrHouse === 'flat' ? 'Byt' : 'dom',
    city,
    street,
    houseNumber,
    countRooms,
    houseCondition:
      houseCondition === 1
        ? 'Novostavba'
        : houseCondition === 2
        ? 'Vynikajúci'
        : houseCondition === 3
        ? 'Dobrý'
        : 'Pôvodný',
    squareMeters,
    allFloorsCount,
    currentFloorNumber,
    hasElevator: hasElevator === 'hasElevator' ? 'Áno' : 'Nie',
    hasBalcony: hasBalcony === true ? 'Áno' : 'Nie',
    hasLoggia: hasLoggia === true ? 'Áno' : 'Nie',
    hasTerrace: hasTerrace === true ? 'Áno' : 'Nie',
    hasBasement: hasBasement === true ? 'Áno' : 'Nie',
    hasGarage: hasGarage === true ? 'Áno' : 'Nie',
    hasParking: hasParking === true ? 'Áno' : 'Nie',
    builtYear,
    hasIsolation: hasIsolation === true ? 'Áno' : 'Nie',
    hasNewElevator: hasNewElevator === true ? 'Áno' : 'Nie',
    hasNewWindows: hasNewWindows === true ? 'Áno' : 'Nie',
    hasNewInstallations: hasNewInstallations === true ? 'Áno' : 'Nie',
    hasThermostat: hasThermostat === true ? 'Áno' : 'Nie',
    hasInternet: hasInternet === true ? 'Áno' : 'Nie',
    hasAlarm: hasAlarm === true ? 'Áno' : 'Nie',
    hasAirCon: hasAirCon === true ? 'Áno' : 'Nie',
    urbanQuality:
      urbanQuality === 'average'
        ? 'priemerná'
        : urbanQuality === 'excellent'
        ? 'výborná'
        : 'slabšia',
    email,
    monthlyCosts,
    price,
  }

  const invoiceData = {
    header: {
      company_logo: __dirname + '/utils/titulok01.png',
    },
    body: {
      city: __dirname + '/utils/titulok02.png',
    },
    final: {
      picture: __dirname + '/utils/mdfinalpage.jpeg',
    },
    qrcode: __dirname + '/utils/md-qr-code.png',
    email: `${email}`,
    flatOrHouse: `${skObj.flatOrHouse}`,
    city: `${skObj.city}`,
    street: `${skObj.street}`,
    houseNumber: `${skObj.houseNumber}`,
    countRooms: `${skObj.countRooms}`,
    houseCondition: `${skObj.houseCondition}`,
    squareMeters: `${skObj.squareMeters} m2`,
    allFloorsCount: `${skObj.allFloorsCount}`,
    currentFloorNumber: `${skObj.currentFloorNumber}`,
    hasElevator: `${skObj.hasElevator}`,
    hasBalcony: `${skObj.hasBalcony}`,
    hasLoggia: `${skObj.hasLoggia}`,
    hasTerrace: `${skObj.hasTerrace}`,
    hasBasement: `${skObj.hasBasement}`,
    hasGarage: `${skObj.hasGarage}`,
    hasParking: `${skObj.hasParking}`,
    builtYear: `${skObj.builtYear}`,
    hasIsolation: `${skObj.hasIsolation}`,
    hasNewElevator: `${skObj.hasNewElevator}`,
    hasNewWindows: `${skObj.hasNewWindows}`,
    hasNewInstallations: `${skObj.hasNewInstallations}`,
    hasThermostat: `${skObj.hasThermostat}`,
    hasInternet: `${skObj.hasInternet}`,
    hasAlarm: `${skObj.hasAlarm}`,
    hasAirCon: `${skObj.hasAirCon}`,
    urbanQuality: `${skObj.urbanQuality}`,
    monthlyCosts: `${skObj.monthlyCosts} €`,
    price: `${skObj.price.toLocaleString()} €`,
  }
  console.log('inv Data', invoiceData)
  let file = `${street}_${houseNumber}_${email}_00${addAttachNumber}.pdf`

  niceInvoice(invoiceData, file)

  const html = `<html>
 
<body>
  <div style="font-size: 16px; text-align: justify; line-height: 32px;">
  <h3 style="font-size: 18px">Gratulujeme,</h3>
  <p>Vaša nehnuteľnosť bola úspešne nacenená. Aktuálnu cenu aj s údajmi zadanými do kalkulačky nájdete v pdf prílohe tohto emailu.</p> 
  <p>Ako BONUS od nás dostávate 50% ZĽAVU na naše služby predaj nehnuteľnosti.</p> 
  <p>Tento bonus je možné uplatniť práve teraz, preto neváhajte a dohodnite si osobné stretnutie už dnes a získajte jedinečné služby, vďaka ktorým predáte svoju nehnuteľnosť za najlepšiu cenu na trhu.</p> 
  
  <p>S pozdravom</p> 
  <p>Moderný Maklér</p> 
  </div>
</body>

  </html>
        `

  try {
    const userMailData = {
      from: `Michal Dovala  ${process.env.MD_EMAIL_FROM}`,

      to: `${email}`,
      //bcc: process.env.MD_BCC,
      bcc: process.env.NODEJS_BCC,
      replyTo: process.env.MD_ADMIN_EMAIL,

      subject: `Moderný marklér`,
      html: html,
      attachments: [
        {
          filename: file,
          path: __dirname + `/${file}`,
          cid: `uniq-${file}`,
        },
      ],
    }
    transporter().sendMail(userMailData)
    res.json({ status: 'Success' })
  } catch (error) {
    console.log(error)
    //res.json({ status: error })
    res.status(500).send(error)
  }
})

const contactEmail = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body

  console.log(name, email, phone, message)
  try {
    const userMailData = {
      from: `Michal Dovala  ${process.env.MD_EMAIL_FROM}`,

      to: `${email}`,
      // bcc: process.env.MD_BCC,
      bcc: process.env.NODEJS_BCC,
      replyTo: process.env.MD_ADMIN_EMAIL,

      subject: `Moderný marklér`,
      html: `<div>
      <p>Dobrý deň,</p>
      <p>Ďakujeme Vám za Váš email.</p>
      <p>Vaše meno: ${name}</p> 
      <p>Váš email: ${email}</p>
      <p>Váš telefón: ${phone}</p> 
      <p>Vaša správa: ${message}</p> 
      
      <p>Ozveme sa Vám čoskoro</p>
    
      
      <p>S pozdravom</p> 
      <p>Moderný Maklér</p> 
  
       
  
      `,
    }
    transporter().sendMail(userMailData)
    res.status(200).json({ status: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export {
  sendEmail,
  contactEmail,
  getAttachmentsCount,
  saveDownloadsEmail,
  getEmails,
}
