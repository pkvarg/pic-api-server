import twilio from 'twilio'

export const message = async (req, res) => {
  const authToken = process.env.TWILIO_WHATSSAPP
  const accountSid = process.env.TWILIO_SID

  const client = twilio(accountSid, authToken)

  const { text } = req.body
  console.log('mess', message)
  try {
    const message = await client.messages.create({
      body: text,
      from: process.env.TWILIO_FROM,
      to: process.env.TWILIO_TO,
    })
    res.send('success')
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}
