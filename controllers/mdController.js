import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// PUT api/md/email

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
    withoutRealEstateAssistance,
    withRealEstateAssistance,
  } = req.body

  console.log('req1', req.body)

  const skObj = {
    flatOrHouse: flatOrHouse === 'flat' ? 'Byt' : 'dom',
    city,
    street,
    houseNumber,
    countRooms,
    houseCondition,
    squareMeters,
    allFloorsCount,
    currentFloorNumber,
    hasElevator: hasElevator === true ? 'Áno' : 'Nie',
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
    withoutRealEstateAssistance,
    withRealEstateAssistance,
  }

  console.log('sk!1', skObj)

  try {
    const userMailData = {
      from: process.env.EMAIL_FROM,

      to: `${email}`,
      bcc: process.env.NODEJS_BCC,

      subject: `Moderný marklér`,
      html: `<div>
      <p>Dobrý deň,</p>
      <p>Ďakujeme Vám za Váš email.</p>
      <p>Váš email: ${email}</p>
      <p>Typ nehnuteľnosti: ${skObj.flatOrHouse}</p> 
      <p>Mesto: ${skObj.city}</p> 
      <p>Ulica: ${skObj.street}</p> 
      <p>Číslo: ${skObj.houseNumber}</p> 
      <p>Počet izieb: ${skObj.countRooms}</p> 
      <p>Stav nehnuteľnosti: ${skObj.houseCondition}</p> 
      <p>Obytná plocha: ${skObj.squareMeters} m2</p> 
      <p>Počet poschodí: ${skObj.allFloorsCount}</p> 
      <p>Číslo poschodia: ${skObj.currentFloorNumber}</p> 
      <p>Výťah: ${skObj.hasElevator}</p> 
      <p>Balkón: ${skObj.hasBalcony}</p> 
      <p>Loggia: ${skObj.hasLoggia}</p> 
      <p>Terasa: ${skObj.hasTerrace}</p> 
      <p>Pivnica: ${skObj.hasBasement}</p> 
      <p>Garáž: ${skObj.hasGarage}</p> 
      <p>Státie: ${skObj.hasParking}</p> 
      <p>Rok výstavby: ${skObj.builtYear}</p> 
      <p>Zateplenie: ${skObj.hasIsolation}</p> 
      <p>Nový výťah: ${skObj.hasNewElevator}</p> 
      <p>Nové okná: ${skObj.hasNewWindows}</p>
         <p>Nové stupačky: ${skObj.hasNewInstallations}</p> 
      <p>Termostat: ${skObj.hasThermostat}</p> 
      <p>Internet: ${skObj.hasInternet}</p> 
      <p>Bezpečnostný systém: ${skObj.hasAlarm}</p> 
      <p>Klimatizácia: ${skObj.hasAirCon}</p> 
      <p>Občianska vybavenosť: ${skObj.urbanQuality}</p> 
      <p>Mesačné náklady: ${skObj.monthlyCosts} €</p> 
      <h3>Cena bez služieb Realitnej kancelárie:  ${skObj.withoutRealEstateAssistance} €</h3> 
      <h3>Cena po odpočítaní služieb Realitnej kancelárie: ${skObj.withRealEstateAssistance} €</h3>
      
      <p>S pozdravom</p> 
      <p>Moderný Maklér</p> 
  
       
  
      `,
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
      from: process.env.EMAIL_FROM,

      to: `${email}`,
      bcc: process.env.NODEJS_BCC,

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

export { sendEmail, contactEmail }
