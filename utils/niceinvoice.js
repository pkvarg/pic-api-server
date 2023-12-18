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
//     picture: __dirname + '/utils/mdfinalpage.png',
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
  console.log('niceinvoice:', invoice)
  let doc = new PDFDocument({ size: 'A4', margin: 40 })

  doc.registerFont('calibri', __dirname + '/utils/fonts/Calibri.ttf')
  doc.registerFont('calibri-bold', __dirname + '/utils/fonts/Calibri-Bold.ttf')

  header(doc, invoice)
  body(doc, invoice)
  title(doc, invoice)
  footer(doc, invoice)
  doc.addPage()
  data(doc, invoice)
  footer(doc, invoice)
  doc.addPage()
  final(doc, invoice)
  footerFinal(doc, invoice)
  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

let header = (doc, invoice) => {
  doc.image(invoice.header.company_logo, 490, 45, { width: 75 }).moveDown()
}

let body = (doc, invoice) => {
  doc
    .image(invoice.body.city, 40, 150, {
      width: 515,
      height: 275,
    })
    .moveDown()
}

let title = (doc, invoice) => {
  doc
    .fillColor('#0775b9')
    .fontSize(14)
    .font('calibri')
    .text('komplexné', 50, 440)
    .fontSize(24)
    .font('calibri-bold')
    .text('NACENENIE', 50, 450)
    .text('NEHNUTEĽNOSTI', 50, 470)
    .fontSize(14)
    .font('calibri')
    .text(
      `${invoice.countRooms} izbový ${invoice.flatOrHouse.toLowerCase()}`,
      50,
      495
    )
    .fontSize(14)
    .font('calibri-bold')
    .text(`${invoice.street} ${invoice.houseNumber}, ${invoice.city}`, 50, 505)

    .moveDown()
}

let footer = (doc, invoice) => {
  doc.rect(0, 650, 660, 150).fill('#0775b9')
  doc.image(invoice.qrcode, 40, 680, {
    width: 90,
    height: 90,
  })
  doc
    .fillColor('white')
    .fontSize(14)
    .font('calibri')
    .text('Michal DOVALA', 450, 685)
    .text('realitný sprostredkovateľ', 397.5, 700)
    .fontSize(12)
    .text('+421 944 517 560', 452.5, 740)
    .text('info@michaldovala.sk', 432.5, 755)
    .moveDown()
}

let data = (doc, invoice) => {
  doc.image(invoice.header.company_logo, 490, 25, { width: 75 })
  doc
    .fillColor('#0775b9')
    .fontSize(18)
    .font('calibri')
    .text(`NACENENIE VAŠEJ NEHNUTEĽNOSTI`, 50, 50)
    .fontSize(14)
    .text(`Počet izieb: ${invoice.countRooms}`, 50, 160)
    .text(`Stav: ${invoice.houseCondition}`, 50, 175)
    .text(`Rozloha: ${invoice.squareMeters}`, 50, 190)
    .text(`Počet poschodí budovy: ${invoice.allFloorsCount}`, 50, 205)
    .text(`Číslo poschodia: ${invoice.currentFloorNumber}`, 50, 220)
    .text(`Výťah: ${invoice.hasElevator}`, 50, 235)
    .text(`Balkón: ${invoice.hasBalcony}`, 50, 250)
    .text(`Loggia: ${invoice.hasLoggia}`, 50, 265)
    .text(`Terasa: ${invoice.hasTerrace}`, 50, 280)
    .text(`Pivnica: ${invoice.hasBasement}`, 50, 295)
    .text(`Garáž: ${invoice.hasGarage}`, 50, 310)
    .text(`Parkovanie: ${invoice.hasParking}`, 50, 325)
    .text(`Rok výstavby: ${invoice.builtYear}`, 50, 340)
    .text(`Zateplenie: ${invoice.hasIsolation}`, 50, 355)
    .text(`Nový výťah: ${invoice.hasNewElevator}`, 50, 370)
    .text(`Nové okná: ${invoice.hasNewWindows}`, 50, 385)
    .text(`Nové stupačky: ${invoice.hasNewInstallations}`, 50, 400)
    .text(`Termostat: ${invoice.hasThermostat}`, 50, 415)
    .text(`Internet: ${invoice.hasInternet}`, 50, 430)
    .text(`Bezpečnostný systém: ${invoice.hasAlarm}`, 50, 445)
    .text(`Klimatizácia: ${invoice.hasAirCon}`, 50, 460)
    .text(
      `Občianska vybavenosť: ${
        invoice.urbanQuality.charAt(0).toUpperCase() +
        invoice.urbanQuality.slice(1)
      }`,
      50,
      475
    )
    .text(`Mesačné náklady: ${invoice.monthlyCosts}`, 50, 490)
    .text(`Váš email: ${invoice.email}`, 50, 505)
    .fontSize(18)
    .text(`Odhadovaná cena: ${invoice.price}`, 50, 535)
    .moveDown()
}
let final = (doc, invoice) => {
  doc
    .image(invoice.header.company_logo, 490, 25, { width: 75 })
    .image(invoice.final.picture, 15, 75, { width: 500 })

    .moveDown()
}
let footerFinal = (doc, invoice) => {
  doc.rect(0, 650, 660, 150).fill('#0775b9')
  doc.image(invoice.qrcode, 40, 680, {
    width: 90,
    height: 90,
  })
  doc
    .fillColor('white')
    .fontSize(18)
    .font('calibri')
    .text('DOHODNITE SI OSOBNÚ OBHLIADKU UŽ DNES!', 199, 687.5)
    // .text('realitný sprostredkovateľ', 397.5, 685)
    .fontSize(12)
    .text('+421 944 517 560', 452.5, 740)
    .text('info@michaldovala.sk', 432.5, 755)
    .moveDown()
}

//niceInvoice(invoiceData, 'attachment01.pdf')

export default niceInvoice
