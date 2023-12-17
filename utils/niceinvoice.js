import fs from 'fs'
import PDFDocument from 'pdfkit'
import path from 'path'
const __dirname = path.resolve()

const invoiceData = {
  header: {
    company_logo: __dirname + '/utils/titulok01.png',
  },
  body: {
    city: __dirname + '/utils/titulok02.png',
  },
  qrcode: __dirname + '/utils/md-qr-code.png',
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

// path = f.ex. orderNumber.pdf to be counted in db and ++

const niceInvoice = (invoice, path) => {
  console.log('invoice:', invoice)
  let doc = new PDFDocument({ size: 'A4', margin: 40 })

  doc.registerFont('calibri', __dirname + '/utils/fonts/Calibri.ttf')
  doc.registerFont('calibri-bold', __dirname + '/utils/fonts/Calibri-Bold.ttf')

  header(doc, invoice)
  body(doc, invoice)
  title(doc, invoice)
  footer(doc, invoice)
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
    .text(`${invoiceData.countRooms} izbový byt`, 50, 495)
    .fontSize(14)
    .font('calibri-bold')
    .text(
      `${invoiceData.street} ${invoiceData.houseNumber}, ${invoiceData.city}`,
      50,
      505
    )

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
    .text('Michal DOVALA', 450, 670)
    .text('realitný sprostredkovateľ', 397.5, 685)
    .fontSize(12)
    .text('+421 944 517 560', 452.5, 750)
    .text('info@michaldovala.sk', 432.5, 765)
    .moveDown()
}

niceInvoice(invoiceData, 'attachment01.pdf')

export default niceInvoice
