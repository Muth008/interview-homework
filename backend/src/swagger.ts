import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Request, Response } from 'express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Warehouse API',
      description: "API endpoints for a warehouse services documented on swagger",
      contact: {
        name: "Jiri Sindelar",
        email: "jorge.sindelar@gmail.com",
        url: "https://github.com/Muth008/warehouse"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  },
  apis: [
    `${__dirname}/routes/*.ts`,
    `${__dirname}/schema/**/*.ts`],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express) {
  // Swagger Page
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/api/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs