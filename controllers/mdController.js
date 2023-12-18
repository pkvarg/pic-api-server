import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import Attachments from '../models/md_sentModel.js'
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

// GET api/bots/counter

const incAttachmentsCount = async () => {
  const attachments = await Attachments.findById(id)
  if (attachments) {
    attachments.attachmentsCount = attachments.attachmentsCount + 1
    await attachments.save()
    const counted = attachments.attachmentsCount
    return counted
  }
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
    withoutRealEstateAssistance,
    withRealEstateAssistance,
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
    withoutRealEstateAssistance,
    withRealEstateAssistance,
  }

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
    price: `${skObj.withRealEstateAssistance.toLocaleString()} €`,
  }
  console.log('attNO', addAttachNumber)
  console.log('inv Data', invoiceData)
  let file = `${street}_${houseNumber}_00${addAttachNumber}.pdf`

  niceInvoice(invoiceData, file)

  const html = `<html>
 
<body>
  <div style="font-size: 16px; text-align: justify; line-height: 32px;">
  <h3 style="font-size: 18px">Gratulujeme,</h3>
  <p>Vaša nehnuteľnosť bola úspešne nacenená. Aktuálnu cenu aj s údajmi zadanými do kalkulačky nájdete v pdf prílohe tohto emailu.</p> 
  <p>Ako BONUS od nás dostávate 50% ZĽAVU na naše služby predaj nehnuteľnosti.</p> 
  <p>Tento bonus je možné uplatniť práve teraz, preto neváhajte a dohodnite si osobné stretnutie už dnes a získajte jedinečné služby, vďaka ktorým predáte svoju nehnuteľnosť za najlepšiu cenu na trhu.</p> 
  <p>A čo od nás získate?</p> 

  <h2 style="font-size: 18px;">13 skvelých služieb.</h2>

  <p>1. Zoznámenie sa s nehnuteľnosťou, zistenie právneho stavu a technických informácii o nehnuteľnosti. Zozbieranie podkladov a dokumentácie k posúdeniu nehnuteľnosti: </p> 
  <p>- dokumentácia</p> 
  <p>- pôdorysy</p> 
  <p>- list vlastníctva</p> 
  <p> -katastrálna mapa</p> 
  <p> -iné dokumenty potrebné k posúdeniu napr. stavebné povolenie, územné rozhodnutie ...</p> 
  <p>2. Analýza trhovej ceny nehnuteľnosti, prepočet ceny nehnuteľnosti a návrh aktuálnej ceny nehnuteľnosti vzhľadom na aktuálne trhové ceny.</p> 
  <p>3. Príprava nehnuteľnosti na predaj, vypracovanie profesionálnej prezentácie nehnuteľnosti za účelom ďalšieho marketingu na sociálnych sieťach, inzertných portáloch, ...</p> 
  <p>Príprava na prezentáciu obsahuje: </p> 
  <p>- profesionálne fotografie nehnuteľnosti, prípadne video k nehnuteľnosti</p> 
  <p>- spracovanie pôdorysu</p> 
  <p>- home staging</p> 
  <p>4. Export už pripravenej a spracovanej ponuky na inzertné portály, sociálne siete, ...</p> 
  <p>5. Aktívne vyhľadávanie záujemcov.</p> 
  <p>6. V rámci jednej provízie deľba s inými realitnými maklérmi v prípade referenčného obchodu.</p>
     <p>7. Váš maklér Vás bude pravidelne kontaktovať o aktivitách, ktoré vykovaná pre predaj Vašej nehnuteľnosti, prinesie Vám štatistické výstupy a odporučí ďalšie kroky pri predaji nehnuteľnosti a v neposlednom rade Vám prinesie spätnú väzbu od záujemcov.</p> 
  <p>8. Obhliadky nehnuteľnosti so záujemcami o nehnuteľnosť.</p> 
  <p>9. Príprava a zabezpečenie zmluvnej dokumentácie, rezervačná zmluva, kúpna zmluva, návrh na vklad do katastra nehnuteľností.</p> 
  <p>10. V prípade úhrady celej alebo časti kúpnej ceny z vlastných prostriedkov kupujúceho, príprava a zabezpečenie úschovy kúpnej ceny v notárskej úschove alebo formou vinkulácie v banke.</p> 
  <p>11. V prípade úhrady kúpnej ceny z úverových prostriedkov, zabezpečenie financovania spolupráci s hypotekárnym špecialistom.</p> 
  <p>12. RK Moderný maklér podá návrh na vklad prevodu vlastníctva na príslušný kataster nehnuteľností, s náležitými potrebnými dokumentami.</p> 
  <p>13. Odovzdanie nehnuteľnosti novému majiteľovi vrátane preberacieho protokolu, taktiež pomoc pri prepise energii a služieb. </p> 
  
 
  
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
      // bcc: process.env.MD_BCC,
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

export { sendEmail, contactEmail }
