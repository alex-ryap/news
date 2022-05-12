export const myNews = {
    tags: ['News'],
    description: `Author's news`,
    operationId: 'newsMy',
    responses: {
        '200': {
            'description': 'News list',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/News'
                        }
                    }
                }
            },
        },
        '401': {
            'description': 'Unauthorized',
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const news = {
    tags: ['News'],
    description: `filtered paginated news`,
    operationId: 'newsFilteredPaginated',
    parameters: [
        {
            'in': 'query',
            'name': 'tags',
            'type': 'array',
            'items': {
                'type': 'string'
            }
        },
        {
            'in': 'query',
            'name': 'onlyNew',
            'type': 'boolean',
        },
        {
            'in': 'query',
            'name': 'author',
            'type': 'number',
        },
        {
            'in': 'query',
            'name': 'header',
            'type': 'string',
        },
        {
            'in': 'query',
            'name': 'offset',
            'type': 'number',
        },
        {
            'in': 'query',
            'name': 'limit',
            'type': 'number',
        },
    ],
    responses: {
        '200': {
            'description': 'News list',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'list': {
                                'type': 'array',
                                'items': {
                                    '$ref': '#/components/schemas/News'
                                }
                            },
                            'offset': {
                                'type': 'number'
                            },
                            'limit': {
                                'type': 'number'
                            },
                            'total': {
                                'type': 'number'
                            }
                        }
                    }
                }
            },
        },
        '401': {
            'description': 'Unauthorized',
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const allNews = {
    tags: ['News'],
    description: `all news without pagination`,
    operationId: 'newsFilteredPaginated',
    responses: {
        '200': {
            'description': 'News list',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/News'
                        }
                    }
                }
            },
        },
        '401': {
            'description': 'Unauthorized',
        }
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const tags = {
    tags: ['News'],
    description: `Tags list`,
    operationId: 'newsTags',
    responses: {
        '200': {
            'description': 'Tags list',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        }
                    }
                }
            },
        },
    },
}

export const read = {
    tags: ['News'],
    description: `mark news as read`,
    operationId: 'newsRead',
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    'type': 'object',
                    'properties': {
                        'ids': {
                            'description': 'list of ids that user read',
                            'type': 'array',
                            'items': {
                                'type': 'number'
                            }
                        },
                    },
                    'required': ['ids']
                }
            }
        }
    },
    responses: {
        '204': {
            'description': 'News marked as read',
        },
        '401': {
            'description': 'Unauthorized',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const createNews = {
    tags: ['News'],
    description: `Create news. Allowed for author and admin roles only.`,
    operationId: 'newsCreate',
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    '$ref': '#/components/schemas/News'
                },
            }
        }
    },
    responses: {
        '204': {
            'description': 'News created',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Action not allowed for current role',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const updateNews = {
    tags: ['News'],
    description: `Update news. Allowed for author and admin roles only.`,
    operationId: 'newsUpdate',
    requestBody: {
        'content': {
            'application/json': {
                'schema': {
                    '$ref': '#/components/schemas/News'
                },
            }
        }
    },
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
    responses: {
        '204': {
            'description': 'News created',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Action not allowed for current role',
        },
        '404': {
            'description': 'News is not owned by current user or does not exist',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}

export const deleteNews = {
    tags: ['News'],
    description: `Delete news. Writer can delete his news only if it's not published. Admin can delete any news`,
    operationId: 'newsDelete',
    parameters: [
        {
            'in': 'path',
            'name': 'id',
            'type': 'number',
            'required': true,
        },
    ],
    responses: {
        '204': {
            'description': 'News deleted',
        },
        '401': {
            'description': 'Unauthorized',
        },
        '403': {
            'description': 'Action not allowed for current role',
        },
        '404': {
            'description': 'News is not owned by current user or does not exist',
        },
    },
// @ts-ignore
    security: [ { apiKeyAuth: [] } ],
}