import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Express , Request } from 'express';



const option: swaggerJSDoc.Options = {
          definition: {
          openapi: '3.0.0',
          info: {
                    title: 'API Documentation of E-commerce',
                    version: '1.0.0',
                     },
          components: {
                    securitySchemes: {
                              bearerAuth: {
                                        type: 'http',
                                        scheme: 'bearer',
                                        bearerFormat: 'JWT',
                                        },
                              },
                    },
                    servers: [
                              {
                                url: 'http://localhost:3000/api/v1', 
                              },
                            ],
      
          },
          apis: ['./src/routes/*.ts']

}

const swaggerSpec = swaggerJSDoc(option);

function swaggerDocs(app: Express  ) {
          // swagger docs
          app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
          // docs as json
          app.get('/docs.json', (req: Request, res) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(swaggerSpec);
          });
          const port = process.env.PORT || 3000;
          
          console.log(`Swagger Docs is running on http://localhost:${port}/docs`);
}

export default swaggerDocs;
