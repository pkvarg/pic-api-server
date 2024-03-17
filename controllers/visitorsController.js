import asyncHandler from 'express-async-handler'
import Visitors from '../models/visitorsModel.js'

const id = '641729fdfa5467afe11ddc0d'

// PUT api/visitors/pic/increase

const increaseVisitors = asyncHandler(async (req, res) => {
  console.log(req.url)
  let url = req.url
  const count = await Visitors.findById(id)
  if (url === '/pic/increase') {
    const visitorsDeclinedInDb = count.visitorsDeclined
    count.visitorsDeclined = visitorsDeclinedInDb + 1
  } else if (url === '/pic/agree/increase') {
    const visitorsAgreedInDb = count.visitorsAgreed
    count.visitorsAgreed = visitorsAgreedInDb + 1
  } else if (url === '/cesta/increase') {
    const visitorsCestaInDb = count.visitorsCestaZivota
    count.visitorsCestaZivota = visitorsCestaInDb + 1
  } else if (url === '/katolicka/increase') {
    const visitorsKatolickaInDb = count.visitorsKatolicka
    count.visitorsKatolicka = visitorsKatolickaInDb + 1
  } else if (url === '/svedkovia/increase') {
    const visitorsSvedkoviaInDb = count.visitorsSvedkovia
    count.visitorsSvedkovia = visitorsSvedkoviaInDb + 1
  } else if (url === '/gender/increase') {
    const visitorsGenderInDb = count.visitorsGender
    count.visitorsGender = visitorsGenderInDb + 1
  } else if (url === '/io/increase') {
    const visitorsDeclinedIoInDb = count.visitorsDeclinedIo
    count.visitorsDeclinedIo = visitorsDeclinedIoInDb + 1
  } else if (url === '/io/agree/increase') {
    const visitorsAgreedIoInDb = count.visitorsAgreedIo
    count.visitorsAgreedIo = visitorsAgreedIoInDb + 1
  } else if (url === '/md/increase') {
    console.log('here inc', url)
    const visitorsMdInDb = count.visitorsMd
    count.visitorsMd = visitorsMdInDb + 1
  } else {
    console.log('unknown url')
  }

  const savedVisitors = await count.save()

  res.json(savedVisitors)
})

// GET api/visitors/pic/counter (both agreed and declined)

const getVisitors = asyncHandler(async (req, res) => {
  console.log(req.url)
  let url = req.url

  const count = await Visitors.findById(id)

  if (url === '/pic/counter') {
    const visitorsDeclined = count.visitorsDeclined
    const visitorsAgreed = count.visitorsAgreed
    res.json({
      agreed: visitorsAgreed,
      declined: visitorsDeclined,
    })
  } else if (url === '/cesta/counter') {
    const visitorsCount = count.visitorsCestaZivota
    res.json(visitorsCount)
  } else if (url === '/katolicka/counter') {
    const visitorsCount = count.visitorsKatolicka
    res.json(visitorsCount)
  } else if (url === '/svedkovia/counter') {
    const visitorsCount = count.visitorsSvedkovia
    res.json(visitorsCount)
  } else if (url === '/gender/counter') {
    const visitorsCount = count.visitorsGender
    res.json(visitorsCount)
  } else if (url === '/io/counter') {
    const visitorsDeclined = count.visitorsDeclinedIo
    const visitorsAgreed = count.visitorsAgreedIo
    res.json({
      agreed: visitorsAgreed,
      declined: visitorsDeclined,
    })
  } else if (url === '/md/counter') {
    const visitorsCount = count.visitorsMd
    console.log('vc here', visitorsCount)
    res.json(visitorsCount)
  } else {
    console.log('Unknown url')
  }
})

export { getVisitors, increaseVisitors }
