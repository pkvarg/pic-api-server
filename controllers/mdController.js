import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import Attachments from '../models/md_sentModel.js'
import Emails from '../models/md_emails.js'
import niceInvoice from '../utils/niceinvoice.js'
import niceInvoiceHouse from '../utils/niceinvoiceHouse.js'
import { html } from '../utils/mdhtml.js'
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
  const { calcValues } = req.body

  const skObj = {
    flatOrHouse: calcValues.flatOrHouse === 'flat' ? 'Byt' : 'dom',
    city: calcValues.city,
    street: calcValues.street,
    houseNumber: calcValues.houseNumber,
    countRooms: calcValues.countRooms,
    houseCondition:
      calcValues.houseCondition === 1
        ? 'Novostavba'
        : calcValues.houseCondition === 2
        ? 'Vynikajúci'
        : calcValues.houseCondition === 3
        ? 'Dobrý'
        : 'Pôvodný',
    squareMeters: calcValues.squareMeters,
    allFloorsCount: calcValues.allFloorsCount,
    currentFloorNumber: calcValues.currentFloorNumber,
    hasElevator: calcValues.hasElevator === 'hasElevator' ? 'Áno' : 'Nie',
    hasBalcony: calcValues.hasBalcony === true ? 'Áno' : 'Nie',
    hasLoggia: calcValues.hasLoggia === true ? 'Áno' : 'Nie',
    hasTerrace: calcValues.hasTerrace === true ? 'Áno' : 'Nie',
    hasBasement: calcValues.hasBasement === true ? 'Áno' : 'Nie',
    hasGarage: calcValues.hasGarage === true ? 'Áno' : 'Nie',
    hasParking: calcValues.hasParking === true ? 'Áno' : 'Nie',
    builtYear: calcValues.builtYear,
    hasIsolation: calcValues.hasIsolation === true ? 'Áno' : 'Nie',
    hasNewElevator: calcValues.hasNewElevator === true ? 'Áno' : 'Nie',
    hasNewWindows: calcValues.hasNewWindows === true ? 'Áno' : 'Nie',
    hasNewInstallations:
      calcValues.hasNewInstallations === true ? 'Áno' : 'Nie',
    hasThermostat: calcValues.hasThermostat === true ? 'Áno' : 'Nie',
    hasInternet: calcValues.hasInternet === true ? 'Áno' : 'Nie',
    hasAlarm: calcValues.hasAlarm === true ? 'Áno' : 'Nie',
    hasAirCon: calcValues.hasAirCon === true ? 'Áno' : 'Nie',
    urbanQuality:
      calcValues.urbanQuality === 'average'
        ? 'priemerná'
        : calcValues.urbanQuality === 'excellent'
        ? 'výborná'
        : 'slabšia',
    email: calcValues.email,
    monthlyCosts: calcValues.monthlyCosts,
    price: calcValues.price,
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
    email: `${skObj.email}`,
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
  console.log('inv Data Flat', invoiceData)
  let file = `${calcValues.street}_${calcValues.houseNumber}_${calcValues.email}_00${addAttachNumber}.pdf`

  niceInvoice(invoiceData, file)

  try {
    const userMailData = {
      from: `Michal Dovala  ${process.env.MD_EMAIL_FROM}`,

      to: `${calcValues.email}`,
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

const sendEmailHouse = asyncHandler(async (req, res) => {
  const addAttachNumber = await incAttachmentsCount()
  const { calcValues } = req.body
  const skObj = {
    flatOrHouse: calcValues.flatOrHouse === 'flat' ? 'Byt' : 'dom',
    city: calcValues.city,
    street: calcValues.street,
    houseNumber: calcValues.houseNumber,
    countRooms: calcValues.countRooms,
    countBathrooms: calcValues.countBathrooms,
    houseCondition:
      calcValues.houseCondition === 1
        ? 'Novostavba'
        : calcValues.houseCondition === 2
        ? 'Vynikajúci'
        : calcValues.houseCondition === 3
        ? 'Dobrý'
        : 'Pôvodný',
    squareMeters: calcValues.squareMeters,
    houseType: calcValues.houseType,
    hasPool: calcValues.hasPool === true ? 'Áno' : 'Nie',
    hasSauna: calcValues.hasSauna === true ? 'Áno' : 'Nie',
    hasGardenShed: calcValues.hasGardenShed === true ? 'Áno' : 'Nie',
    hasGarage: calcValues.hasGarage === true ? 'Áno' : 'Nie',
    hasBasement: calcValues.hasBasement === true ? 'Áno' : 'Nie',
    hasTerrace: calcValues.hasTerrace === true ? 'Áno' : 'Nie',
    landType:
      calcValues.landType === 1
        ? 'Rovinatý'
        : calcValues.landType === 2
        ? 'Svahovitý'
        : calcValues.landType === 3
        ? 'Strmý svah'
        : 'Terasovitý',
    landSquareMeters: calcValues.landSquareMeters,
    builtYear: calcValues.builtYear,
    hasThermostat: calcValues.hasThermostat === true ? 'Áno' : 'Nie',
    hasAlarm: calcValues.hasAlarm === true ? 'Áno' : 'Nie',
    hasFireAlarm: calcValues.hasFireAlarm === true ? 'Áno' : 'Nie',
    hasSolarCollectors: calcValues.hasSolarCollectors === true ? 'Áno' : 'Nie',
    hasCameraSystem: calcValues.hasCameraSystem === true ? 'Áno' : 'Nie',
    hasInternet: calcValues.hasInternet === true ? 'Áno' : 'Nie',
    hasWell: calcValues.hasWell === true ? 'Áno' : 'Nie',
    hasCityWater: calcValues.hasCityWater === true ? 'Áno' : 'Nie',
    hasCitySewerage: calcValues.hasCitySewerage === true ? 'Áno' : 'Nie',
    hasSeptic: calcValues.hasSeptic === true ? 'Áno' : 'Nie',
    hasElectricity: calcValues.hasElectricity === true ? 'Áno' : 'Nie',
    hasGas: calcValues.hasGas === true ? 'Áno' : 'Nie',
    urbanQuality:
      calcValues.urbanQuality === 'average'
        ? 'priemerná'
        : calcValues.urbanQuality === 'excellent'
        ? 'výborná'
        : 'slabšia',
    hasElectricRadiators:
      calcValues.hasElectricRadiators === true ? 'Áno' : 'Nie',
    hasHeatPump: calcValues.hasHeatPump === true ? 'Áno' : 'Nie',
    hasOther: calcValues.hasOther === true ? 'Áno' : 'Nie',
    hasSolidFuel: calcValues.hasSolidFuel === true ? 'Áno' : 'Nie',
    hasGasBoiler: calcValues.hasGasBoiler === true ? 'Áno' : 'Nie',
    hasUnderfloorHeating:
      calcValues.hasUnderfloorHeating === true ? 'Áno' : 'Nie',
    email: calcValues.email,

    price: calcValues.price,
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
    email: `${skObj.email}`,
    flatOrHouse: `${skObj.flatOrHouse}`,
    city: `${skObj.city}`,
    street: `${skObj.street}`,
    houseNumber: `${skObj.houseNumber}`,
    countRooms: `${skObj.countRooms}`,
    countBathrooms: `${skObj.countBathrooms}`,
    houseCondition: `${skObj.houseCondition}`,
    squareMeters: `${skObj.squareMeters} m2`,

    houseType: `${skObj.houseType}`,

    hasPool: `${skObj.hasPool}`,
    hasSauna: `${skObj.hasSauna}`,
    hasGardenShed: `${skObj.hasGardenShed}`,
    hasGarage: `${skObj.hasGarage}`,
    hasBasement: `${skObj.hasBasement}`,
    hasTerrace: `${skObj.hasTerrace}`,
    landType: `${skObj.landType}`,
    landSquareMeters: `${skObj.landSquareMeters} m2`,
    builtYear: `${skObj.builtYear}`,
    hasThermostat: `${skObj.hasThermostat}`,
    hasAlarm: `${skObj.hasAlarm}`,
    hasFireAlarm: `${skObj.hasFireAlarm}`,
    hasSolarCollectors: `${skObj.hasSolarCollectors}`,
    hasCameraSystem: `${skObj.hasCameraSystem}`,
    hasInternet: `${skObj.hasInternet}`,
    hasWell: `${skObj.hasWell}`,
    hasCityWater: `${skObj.hasCityWater}`,

    hasCitySewerage: `${skObj.hasCitySewerage}`,
    hasSeptic: `${skObj.hasSeptic}`,
    hasElectricity: `${skObj.hasElectricity}`,
    hasGas: `${skObj.hasGas}`,
    urbanQuality: `${skObj.urbanQuality}`,
    hasElectricRadiators: `${skObj.hasElectricRadiators}`,
    hasHeatPump: `${skObj.hasHeatPump}`,
    hasOther: `${skObj.hasOther}`,
    hasSolidFuel: `${skObj.hasSolidFuel}`,
    hasGasBoiler: `${skObj.hasGasBoiler}`,
    hasUnderfloorHeating: `${skObj.hasUnderfloorHeating}`,

    price: `${skObj.price.toLocaleString()} €`,
  }
  console.log('inv Data House', invoiceData)
  let file = `${calcValues.street}_${calcValues.houseNumber}_${calcValues.email}_00${addAttachNumber}.pdf`

  niceInvoiceHouse(invoiceData, file)

  try {
    const userMailData = {
      from: `Michal Dovala  ${process.env.MD_EMAIL_FROM}`,

      to: `${calcValues.email}`,
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
    res.status(500).send(error)
  }
})

export {
  sendEmail,
  sendEmailHouse,
  contactEmail,
  getAttachmentsCount,
  saveDownloadsEmail,
  getEmails,
}
