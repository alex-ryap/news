export const signup = {
    tags: ['Auth'],
    description: 'Creates user',
    operationId: 'signup',
    responses: {
        '201': {
            'description': 'User created',
        },
        '400': {
            'description': 'Required properties not found/User already exists',
        }
    },
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    'type': 'object',
                    'properties': {
                        'login': {
                            'description': 'New user login',
                            'type': 'string'
                        },
                        'password': {
                            'description': 'New user password',
                            'type': 'string'
                        }
                    },
                    'required': ['login', 'password']
                }
            }
        }
    }
}

export const login = {
    tags: ['Auth'],
    description: 'User authentication',
    operationId: 'login',
    responses: {
        '200': {
            'description': 'User created',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'token': {
                                'description': 'User token',
                                'type': 'string'
                            }
                        }
                    }
                },
            }
        },
        '401': {
            'description': 'Wrong login or password',
        }
    },
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    'type': 'object',
                    'properties': {
                        'login': {
                            'description': 'New user login',
                            'type': 'string'
                        },
                        'password': {
                            'description': 'New user password',
                            'type': 'string'
                        }
                    },
                    'required': ['login', 'password']
                }
            }
        }
    },
}

export const logout = {
    tags: ['Auth'],
    description: 'User logout',
    operationId: 'logout',
    responses: {
        '204': {
            'description': 'User logged out',
        },
        '401': {
            'description': 'User not authorized',
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}