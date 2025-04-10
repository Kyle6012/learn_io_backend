const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const envUtils = require('../common/envUtils');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Learn IO Backend API',
        version: '1.0.1',
        description: 'API documentation for Learn IO backend services with cookie-based authentication',
    },
    servers: [{
            url: `http://localhost:${envUtils.get('PORT') || 3000}`,
            description: 'Development server'
        },
        {
            url: 'https://api.learnio.example.com',
            description: 'Production server'
        }
    ],
    components: {
        securitySchemes: {
            // Cookie Authentication
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token',
                description: 'HTTP-only cookie containing JWT token'
            },
            // Bearer Token (maintained for backward compatibility)
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '507f1f77bcf86cd799439011'
                    },
                    name: {
                        type: 'string',
                        example: 'John Doe'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john@example.com'
                    },
                    role: {
                        type: 'string',
                        enum: ['student', 'staff', 'admin'],
                        example: 'student'
                    },
                    profilePicture: {
                        type: 'string',
                        example: 'uploads/profile.jpg'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                }
            },
            Article: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        example: 'Introduction to Computer Science'
                    },
                    body: {
                        type: 'string',
                        example: 'This article covers basic concepts...'
                    },
                    author: {
                        $ref: '#/components/schemas/User'
                    },
                    filePath: {
                        type: 'string',
                        example: 'uploads/article1.pdf'
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        example: ['computer-science', 'basics']
                    }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Error description'
                    },
                    error: {
                        type: 'string',
                        example: 'Detailed error message'
                    }
                }
            }
        },
        responses: {
            UnauthorizedError: {
                description: 'Authentication failed',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },
            ValidationError: {
                description: 'Request validation failed',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                errors: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            field: {
                                                type: 'string'
                                            },
                                            message: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const options = {
    swaggerDefinition,
    apis: [
        './routes/*.js', // Main route files
        './models/*.js', // Model definitions
        './common/response.js' // Common response formats
    ]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
    setup: (app) => {
        app.use('/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec, {
                explorer: true,
                swaggerOptions: {
                    validatorUrl: null,
                    persistAuthorization: true,
                    displayRequestDuration: true,
                    defaultModelsExpandDepth: -1, // Hide schemas by default
                    docExpansion: 'none',
                    // Enable cookie passing for try-it-out
                    requestInterceptor: (req) => {
                        if (req.loadSpec) return req;

                        // For cookie-based endpoints
                        if (req.url.includes('/login') || req.url.includes('/register')) {
                            req.credentials = 'include';
                        }
                        return req;
                    }
                }
            })
        );
    }
};