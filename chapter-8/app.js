const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./server/routes')
const errorHandler = require('./server/middlewares/errorHandler')
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const PORT = process.env.PORT || 4000

// middlewares
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(errorHandler)

/**
 * @Routes /api
 * entrypoint for all API routes
 */
app.use("/api", apiRouter)

const swaggerConfig = swaggerjsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Player Management API Documentation',
      description: 'Dokumentasi API untuk servis menejemen player',
      version: '0.1.0',
      contact: {
        name: 'Valdryan Ivandito',
        email: 'valdryan05@gmail.com',
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local Server'
      }
    ]
  },
  apis: ['./server/routes/*.js']
})
app.use('/api/v1/docs', swaggerui.serve, swaggerui.setup(swaggerConfig))

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})