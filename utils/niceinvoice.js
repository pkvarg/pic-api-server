import fs from 'fs'
import PDFDocument from 'pdfkit'
import path from 'path'
const __dirname = path.resolve()

// const invoiceData = {
//   header: {
//     company_logo: __dirname + '/utils/titulok01.png',
//   },
//   body: {
//     city: __dirname + '/utils/titulok02.png',
//   },
//   final: {
//     picture: __dirname + '/utils/mdfinalpage.jpeg',
//   },
//   qrcode: __dirname + '/utils/md-qr-code.png',
//   email: 'pkvarg@yahoo.se',
//   flatOrHouse: 'Byt',
//   city: 'Bratislava',
//   street: 'Bardejovská ulica',
//   houseNumber: '23',
//   countRooms: '3',
//   houseCondition: '2',
//   squareMeters: '78 m2',
//   allFloorsCount: '3',
//   currentFloorNumber: '2',
//   hasElevator: 'Nie',
//   hasBalcony: 'Áno',
//   hasLoggia: 'Nie',
//   hasTerrace: 'Nie',
//   hasBasement: 'Nie',
//   hasGarage: 'Nie',
//   hasParking: 'Nie',
//   builtYear: '1960',
//   hasIsolation: 'Áno',
//   hasNewElevator: 'Nie',
//   hasNewWindows: 'Áno',
//   hasNewInstallations: 'Áno',
//   hasThermostat: 'Nie',
//   hasInternet: 'Nie',
//   hasAlarm: 'Nie',
//   hasAirCon: 'Nie',
//   urbanQuality: 'priemerná',
//   monthlyCosts: '200 €',
//   price: '233000 €',
// }

// path = f.ex. orderNumber.pdf to be counted in db and ++

const niceInvoice = (invoice, path) => {
  let doc = new PDFDocument({ size: 'A4', margin: 40 })

  doc.registerFont('trebuchet', __dirname + '/utils/fonts/trebuc.ttf')
  doc.registerFont('trebuchet-bold', __dirname + '/utils/fonts/trebuc-bold.ttf')

  header(doc, invoice)
  body(doc, invoice)
  title(doc, invoice)
  footer(doc, invoice)
  doc.addPage()
  header(doc, invoice)
  data(doc, invoice)
  footer(doc, invoice)
  doc.addPage()
  header(doc, invoice)
  third(doc)
  doc.addPage()

  final(doc, invoice)
  footerFinal(doc, invoice)
  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

let header = (doc, invoice) => {
  doc.image(invoice.header.company_logo, 425, 0, { width: 150 }).moveDown()
}

let body = (doc, invoice) => {
  doc
    .image(invoice.body.city, 40, 150, {
      width: 510,
    })
    .moveDown()
}

let title = (doc, invoice) => {
  doc
    .fillColor('#0775b9')
    .fontSize(14)
    .font('trebuchet')
    .text('komplexné', 50, 540)
    .fontSize(35)
    .font('trebuchet-bold')
    .text('NACENENIE', 50, 555)
    .text('NEHNUTEĽNOSTI', 50, 585)
    .fontSize(14)
    .text(
      `${invoice.countRooms} izbový ${invoice.flatOrHouse.toLowerCase()}`,
      50,
      625
    )
    .fontSize(18)
    .font('trebuchet')
    .text(`${invoice.street} ${invoice.houseNumber}, ${invoice.city}`, 50, 640)

    .moveDown()
}

let footer = (doc, invoice) => {
  doc.rect(0, 677, 680, 165).fill('#0775b9')
  doc.image(invoice.qrcode, 45, 712, {
    width: 90,
    height: 90,
  })
  doc
    .fillColor('white')
    .fontSize(20)
    .font('trebuchet')
    .text('Michal DOVALA', 420, 717)
    .fontSize(16)
    .text('realitný sprostredkovateľ', 370, 737)
    .fontSize(14)
    .text('+421 944 517 560', 442.5, 767)
    .text('info@michaldovala.sk', 415, 782)
    .moveDown()
}

let data = (doc, invoice) => {
  doc
    .fillColor('#0775b9')
    .fontSize(24)
    .font('trebuchet')
    .text(`Nacenenie Vašej`, 50, 50)
    .text(`NEHNUTEĽNOSTI`, 50, 75)

    .fontSize(14)
    .font('trebuchet-bold')
    .text(`Základné údaje`, 60, 155)

    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(12)
    .text(`Typ: ${invoice.flatOrHouse}`, 60, 175)
    .text(`Stav nehnuteľnosti: ${invoice.houseCondition}`, 60, 192)

    .text(
      `Občianska vybavenosť: ${
        invoice.urbanQuality.charAt(0).toUpperCase() +
        invoice.urbanQuality.slice(1)
      }`,
      350,
      175
    )
    .text(`Mesačné náklady: ${invoice.monthlyCosts}`, 350, 192)

    // 2

    .fontSize(14)
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .text(`Dispozícia`, 60, 220)

    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(12)
    .text(`Počet izieb: ${invoice.countRooms}`, 60, 240)
    .text(`Obytná plocha: ${invoice.squareMeters}`, 60, 257)
    .text(`Počet poschodí: ${invoice.allFloorsCount}`, 60, 274)
    .text(`Číslo poschodia: ${invoice.currentFloorNumber}`, 60, 291)

    .text(`Balkón: ${invoice.hasBalcony}`, 350, 240)
    .text(`Loggia: ${invoice.hasLoggia}`, 350, 257)
    .text(`Terasa: ${invoice.hasTerrace}`, 350, 274)
    .text(`Pivnica: ${invoice.hasBasement}`, 350, 291)

    // 3

    .fontSize(14)
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .text(`Stav a vybavenie`, 60, 319)

    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(12)
    .text(`Výťah: ${invoice.hasElevator}`, 60, 339)
    .text(`Termostat: ${invoice.hasThermostat}`, 60, 356)
    .text(`Internet: ${invoice.hasInternet}`, 60, 373)
    .text(`Bezpečnostný systém: ${invoice.hasAlarm}`, 60, 390)
    .text(`Klimatizácia: ${invoice.hasAirCon}`, 60, 407)

    .text(`Nový výťah: ${invoice.hasNewElevator}`, 350, 339)
    .text(`Rok výstavby: ${invoice.builtYear}`, 350, 356)
    .text(`Zateplenie: ${invoice.hasIsolation}`, 350, 373)
    .text(`Nové okná: ${invoice.hasNewWindows}`, 350, 390)
    .text(`Nové stupačky: ${invoice.hasNewInstallations}`, 350, 407)

    // 4

    .fontSize(14)
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .text(`Parkovanie`, 60, 435)

    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(12)
    .text(`Garáž: ${invoice.hasGarage}`, 60, 455)
    .text(`Státie: ${invoice.hasParking}`, 60, 475)

    //.font('trebuchet-bold')

    .text(`Odhadovaná cena`, 150, 535)
    .text(`Vašej nehnuteľnosti:`, 137.5, 552.5)
    .fontSize(35)
    .fillColor('#0775b9')
    .text(`${invoice.price}`, 300, 531)

    // .text(`Váš email: ${invoice.email}`, 50, 505)
    .moveDown()
}
let third = (doc, invoice) => {
  doc
    .fillColor('#0775b9')
    .fontSize(20)
    .font('trebuchet-bold')
    .text(`BALÍK SLUŽIEB`, 50, 40)
    .font('trebuchet')
    .fontSize(16)
    .text(`ktorý získate ako klient spoločnosti`, 187, 43.5)
    .font('trebuchet-bold')
    .fontSize(20)
    .text(`MODERNÝ MAKLÉR s.r.o.`, 150, 65)
    .fontSize(12)
    .text(`1.`, 50, 110)
    .text(`Profesionálne zoznámenie s nehnuteľnosťou:`, 80, 110)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      získanie informácií o právnom a technickom stave nehnuteľnosti`,
      90,
      125
    )
    .text(`-      zhromaždenie potrebných dokumentov a materiálov`, 90, 137.5)
    // 2
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`2.`, 50, 160)
    .text(`Analýza trhovej hodnoty nehnuteľnosti:`, 80, 160)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(`-      navrhnutie aktuálnej ceny s ohľadom na trhové ceny`, 90, 175)

    // 3
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`3.`, 50, 197.5)
    .text(`Príprava na predaj:`, 80, 197.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(`-      profesionálne nafotenie nehnuteľnosti`, 90, 212.5)
    .text(`-      virtuálna prehliadka nehnuteľnosti`, 90, 225)
    .text(`-      spracovanie pôdorysu`, 90, 237.5)
    .text(`-      kozmetická úprava nehnuteľnosti (home staging)`, 90, 250)

    // 4
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`4.`, 50, 272.5)
    .text(`Export ponuky na inzertné portály a sociálne siete:`, 80, 272.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      distribúcia profesionálne pripravenej ponuky na relevantné platformy`,
      90,
      287.5
    )

    // 5
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`5.`, 50, 310)
    .text(`Vyhľadávanie potencionálnych záujemcov:`, 80, 310)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      aktívne vyhľadávanie a oslovovanie záujemcov o nehnuteľnosť`,
      90,
      325
    )

    // 6
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`6.`, 50, 347.5)
    .text(`Spolupráca s inými realitnými maklérmi:`, 80, 347.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(`-      delenie provízie prípade referenčného obchodu`, 90, 362.5)

    // 7
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`7.`, 50, 385)
    .text(`Pravidelný kontakt a reporting:`, 80, 385)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      informácie o aktivitách, spätná väzba od záujemcov a odporúčania`,
      90,
      400
    )
    .text(`        k ďalším krokom`, 90, 412.5)

    // 8
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`8.`, 50, 435)
    .text(`Obhliadky s potenciálnymi záujemcami:`, 80, 435)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(`-      oragnizácia a realizácia obhliadok so záujemcami`, 90, 450)

    // 9

    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`9.`, 50, 472.5)
    .text(`Príprava zmluvnej dokumentácie:`, 80, 472.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      vytvorenie rezervačnej zmluvy alebo zmluvy o budúcej kúpnej zmluve`,
      90,
      487.5
    )

    // 10
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`10.`, 50, 510)
    .text(`Zabezbečenie kúpnych zmlúv:`, 80, 510)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      príprava a spracovanie potrebných dokumentov pre kúpne zmluvy`,
      90,
      525
    )

    // 11
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`11.`, 50, 547.5)
    .text(`Úschova kúpnej zmluvy:`, 80, 547.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      v príprade úhrady vlastnými prostriedkami, zabezpečenie úschovy`,
      90,
      562.5
    )
    .text(
      `-      kúpnej zmluvy v notárskej úschove alebo v banke formou vinkulácie `,
      90,
      575
    )

    // 12
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`12.`, 50, 597.5)
    .text(`Financovanie cez hypotekárneho makléra:`, 80, 597.5)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      v príprade financovanie bankou, spolupráca s hypotekárnym maklérom`,
      90,
      612.5
    )

    // 13
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`13.`, 50, 635)
    .text(`Návrh na vklad prevodu vlastníctva:`, 80, 635)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      podanie návrhu na vklad prevodu vlastníctva na príslušný kataster`,
      90,
      650
    )
    .text(`       s potrebnými dokumentami`, 90, 662.5)

    // 14
    .fillColor('#0775b9')
    .font('trebuchet-bold')
    .fontSize(12)
    .text(`14.`, 50, 685)
    .text(`Odovzdanie nehnuteľnosti novému majiteľovi:`, 80, 685)
    .fillColor('#959595')
    .font('trebuchet')
    .fontSize(10)
    .text(
      `-      vrátane preberacieho protokolu a asistencie pri prepise energií `,
      90,
      700
    )
  doc
    .rect(0, 800, 680, 100)
    .fill('#0775b9')

    .moveDown()
}

let final = (doc, invoice) => {
  doc.rect(0, 650, 660, 150).fill('#0775b9')
  doc
    //.image(invoice.header.company_logo, 490, 25, { width: 75 })
    .image(invoice.final.picture, 0, 0, { width: 595.5 })

    .moveDown()
}
let footerFinal = (doc, invoice) => {
  doc.rect(0, 562.5, 660, 1550).fill('#0775b9')
  doc.image(invoice.qrcode, 32.5, 640, {
    width: 130,
    height: 130,
  })
  doc
    .fillColor('white')
    .fontSize(30)
    .font('trebuchet')
    .text('DOHODNITE SI OSOBNÚ OBHLIADKU UŽ DNES!', 199, 677.5)
    // .text('realitný sprostredkovateľ', 397.5, 685)
    .fontSize(12)
    // .text('+421 944 517 560', 452.5, 740)
    // .text('info@michaldovala.sk', 432.5, 755)
    .moveDown()
}

//niceInvoice(invoiceData, 'newAttachment01.pdf')

export default niceInvoice
