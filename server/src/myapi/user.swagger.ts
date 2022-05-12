export const authors = {
    tags: ['User'],
    description: `Author's list`,
    operationId: 'authors',
    responses: {
        '200': {
            'description': 'Author\'s list',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'id': {
                                    'description': 'id',
                                    'type': 'number'
                                },
                                'firstName': {
                                    'description': 'firstName',
                                    'type': 'string'
                                }
                                ,
                                'lastName': {
                                    'description': 'lastName',
                                    'type': 'string'
                                }
                                ,
                                'nickname': {
                                    'description': 'nickname',
                                    'type': 'string'
                                }
                            }
                        }
                    }
                }
            },
        }
    },
}

export const me = {
    tags: ['User'],
    description: `User info`,
    operationId: 'me',
    responses: {
        '200': {
            'description': 'User details',
            'content': {
                'application/json': {
                    'schema': {
                        '$ref': '#/components/schemas/User'
                    }
                }
            },
        },
        '401': {
            'description': 'Unauthorized',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const updateMe = {
    tags: ['User'],
    description: `Update user info`,
    operationId: 'updateMe',
    responses: {
        '200': {
            'description': 'User details',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'id': {
                                'description': 'User id',
                                'type': 'number'
                            }
                        }
                    }
                }
            },
        },
        '401': {
            'description': 'Unauthorized',
        },
    },
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    '$ref': '#/components/schemas/UserUpdate'
                },
            }
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}
