import { io } from 'socket.io-client'

const socket = io(process.env.VITE_SERVER_URL || 'http://localhost:5000')

export default socket