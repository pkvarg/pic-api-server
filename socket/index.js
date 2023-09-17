import { Server } from 'socket.io'

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const activeUsers = []

const addUser = (userEmail, socketId) => {
  console.log('addU', userEmail)
  !activeUsers.some((email) => email === userEmail) &&
    activeUsers.push({ userEmail, socketId })
  console.log('UsersArray', activeUsers)
}

const removeUser = (socketId) => {
  activeUsers.filter((user) => user.socketId !== socketId)
}

// const getUser = (username) => {
//   return users.find((user) => user.username === username)
// }

io.on('connection', (socket) => {
  // when connect
  //activeUsers.push(socket.id)
  console.log(`User Connected: ${socket.id}`)

  // Take userEmail
  socket.on('addUser', (userEmail) => {
    if (userEmail) {
      addUser(userEmail, socket.id)
      io.emit('getUsers', activeUsers)
      console.log('added', activeUsers)
    }
    // })

    // send and get message

    socket.on('sendMessage', (data, convId) => {
      console.log('data:', data, convId)
      io.emit('receiveMessage', data, convId)
      // io.to(UserId).emit('receiveMessage', data)
    })

    // when disconnect
    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id)
      removeUser(socket.id)
      io.emit('getUsers', activeUsers)
      console.log('afterDisconnect:', activeUsers)
    })
  })
})
