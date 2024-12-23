import http from 'node:http'
import express from 'express'

const port = parseInt(process.env.PORT, 10) || 3333

const app = express()

const server = http.createServer(app)

server.listen(port, '127.0.0.1')

server.on('error', error => {
  if (port === 5555) console.error(`Failed on start listening in ${port}. ERROR: ${error.message}`)
})

server.on('listening', () => {
  if (port === 5555) console.log(`Server is running on http://localhost:${port}`)
})
