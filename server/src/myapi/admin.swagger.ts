export const adminUsers = {
    tags: ['Admin'],
    description: `User's list`,
    operationId: 'adminUsers',
    responses: {
        '200': {
            'description': 'User\'s list - for admins only',
            'content': {
                'application/json': {
                    'schema': {
                        '$ref': '#/components/schemas/UserAdmin'
                    }
                }
            }
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const adminUserNews = {
    tags: ['Admin'],
    description: `User news list`,
    operationId: 'adminUserNews',
    responses: {
        '200': {
            'description': 'User news list - for admins only',
            'content': {
                'application/json': {
                    'schema': {
                        '$ref': '#/components/schemas/UserAdmin'
                    }
                }
            }
        },
        '400': {
            'description': 'id not defined',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
        '404': {
            'description': 'user not found',
        },
    },
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const adminUserUpdate = {
    tags: ['Admin'],
    description: `User role update`,
    operationId: 'adminUserNews',
    responses: {
        '204': {
            'description': 'User role updated',
        },
        '400': {
            'description': 'id or role not defined',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
        '404': {
            'description': 'user not found',
        },
    },
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    'type': 'object',
                    'properties': {
                        'role': {
                            'description': 'New user role',
                            'type': 'string',
                            'enum': [
                                'reader',
                                'writer',
                                'admin'
                            ]
                        },
                    },
                    'required': ['role']
                }
            }
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const adminUserDelete = {
    tags: ['Admin'],
    description: `Delete user`,
    operationId: 'adminUserDelete',
    responses: {
        '204': {
            'description': 'User deleted',
        },
        '400': {
            'description': 'id not defined',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
        '404': {
            'description': 'user not found',
        },
    },
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const adminNewsDelete = {
    tags: ['Admin'],
    description: `Delete news`,
    operationId: 'adminNewsDelete',
    responses: {
        '204': {
            'description': 'News deleted',
        },
        '400': {
            'description': 'id not defined',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
    },
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const adminNewsTagsUpdate = {
    tags: ['Admin'],
    description: `News tags update - rewrites tags array`,
    operationId: 'adminNewsTags',
    responses: {
        '204': {
            'description': 'Tags updated',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
    },
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    },
                }
            }
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}


export const adminNewsUpdate = {
    tags: ['Admin'],
    description: `News update`,
    operationId: 'adminNewsUpdate',
    responses: {
        '204': {
            'description': 'News updated',
        },
        '400': {
            'description': 'id not defined',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Forbidden for current role',
        },
        '404': {
            'description': 'News not found',
        },
    },
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    '$ref': '#/components/schemas/News'
                },
            }
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}
