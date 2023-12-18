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
      user: process.env.MD_USERNAME,
      pass: process.env.MD_PASSWORD,
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
    houseCondition:
      houseCondition === '1'
        ? 'Novostavba'
        : houseCondition === '2'
        ? 'Vynikajúci'
        : houseCondition === '3'
        ? 'Dobrý'
        : 'Pôvodný',
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

  try {
    const invoiceData = {
      header: {
        company_logo: __dirname + '/utils/titulok01.png',
      },
      body: {
        city: __dirname + '/utils/titulok02.png',
      },
      final: {
        picture: __dirname + '/utils/mdfinalpage.png',
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
      price: `${skObj.withRealEstateAssistance} €`,
    }

    const fixData = {
      email: 'pkvarg@yahoo.se',
      flatOrHouse: 'Byt',
      city: 'Bratislava',
      street: 'Bardejovská ulica',
      houseNumber: '23',
      countRooms: '3',
      houseCondition: '2',
      squareMeters: '78 m2',
      allFloorsCount: '3',
      currentFloorNumber: '2',
      hasElevator: 'Nie',
      hasBalcony: 'Áno',
      hasLoggia: 'Nie',
      hasTerrace: 'Nie',
      hasBasement: 'Nie',
      hasGarage: 'Nie',
      hasParking: 'Nie',
      builtYear: '1960',
      hasIsolation: 'Áno',
      hasNewElevator: 'Nie',
      hasNewWindows: 'Áno',
      hasNewInstallations: 'Áno',
      hasThermostat: 'Nie',
      hasInternet: 'Nie',
      hasAlarm: 'Nie',
      hasAirCon: 'Nie',
      urbanQuality: 'priemerná',
      monthlyCosts: '200 €',
      price: '233000 €',
    }

    console.log(invoiceData)
    const userMailData = {
      from: `Michal Dovala  ${process.env.MD_EMAIL_FROM}`,

      to: `${email}`,
      bcc: process.env.MD_BCC,
      replyTo: process.env.MD_ADMIN_EMAIL,

      subject: `Moderný marklér`,
      html: `<div>
      <p>Dobrý deň,</p>
     
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
      
      <h3>Odhadovaná cena Vašej
      nehnuteľnosti: ${skObj.withRealEstateAssistance} €</h3>
      
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

export { sendEmail, contactEmail }
