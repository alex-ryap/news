import {login, logout, signup} from './myapi/auth.swagger'
import {allNews, createNews, deleteNews, myNews, news, read, tags, updateNews} from './myapi/news.swagger'
import {authors, me, updateMe} from './myapi/user.swagger'
import {
    adminNewsDelete, adminNewsTagsUpdate,
    adminNewsUpdate,
    adminUserDelete,
    adminUserNews,
    adminUsers,
    adminUserUpdate
} from './myapi/admin.swagger'

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'News backend',
        description: 'News backend for final students project',
        termsOfService: '',
        contact: {
            name: 'Mariya Tikhonova',
            email: 'koshkinoko.hana@gmail.com',
            url: ''
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'The local API server',
        }
    ],
    components: {
        securitySchemes: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'token'
            }
        },
        schemas: {
            'News': {
                'type': 'object',
                'properties': {
                    'header': {
                        'type': 'string',
                    },
                    'description': {
                        'type': 'string'
                    },
                    'tags': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        }
                    },
                    'state': {
                        'type': 'string',
                        'enum': [
                            'draft',
                            'published'
                        ]
                    },
                    'publicationDate': {
                        'type': 'string',
                    },
                }
            },
            'User': {
                'type': 'object',
                'properties': {
                    'firstName': {
                        'type': 'string',
                    },
                    'lastName': {
                        'type': 'string'
                    },
                    'phone': {
                        'type': 'string'
                    },
                    'tags': {
                        'type': 'array',
                            'items': {
                            'type': 'string'
                        }
                    },
                    'showFirstName': {
                        'type': 'boolean',
                    },
                    'showLastName': {
                        'type': 'boolean',
                    },
                    'showPhone': {
                        'type': 'boolean',
                    },
                    'role': {
                        'type': 'string',
                        'enum': [
                            'reader',
                            'writer',
                            'admin'
                        ]
                    },
                }
            },
            'UserUpdate': {
                'type': 'object',
                'properties': {
                    'firstName': {
                        'type': 'string',
                    },
                    'lastName': {
                        'type': 'string'
                    },
                    'phone': {
                        'type': 'string'
                    },
                    'tags': {
                        'type': 'array',
                            'items': {
                            'type': 'string'
                        }
                    },
                    'showFirstName': {
                        'type': 'boolean',
                    },
                    'showLastName': {
                        'type': 'boolean',
                    },
                    'showPhone': {
                        'type': 'boolean',
                    },
                }
            },
            'UserAdmin': {
                'type': 'object',
                'properties': {
                    'firstName': {
                        'type': 'string',
                    },
                    'lastName': {
                        'type': 'string'
                    },
                    'phone': {
                        'type': 'string'
                    },
                    'tags': {
                        'type': 'array',
                            'items': {
                            'type': 'string'
                        }
                    },
                    'showFirstName': {
                        'type': 'boolean',
                    },
                    'showLastName': {
                        'type': 'boolean',
                    },
                    'showPhone': {
                        'type': 'boolean',
                    },
                    'role': {
                        'type': 'string',
                        'enum': [
                            'reader',
                            'writer',
                            'admin'
                        ]
                    },
                    'login': {
                        'type': 'string',
                    },
                }
            },
        },
    },
    tags: [
        {name: 'Admin'},
        {name: 'Auth'},
        {name: 'News'},
        {name: 'User'}
    ],
    paths: {
        '/auth/signup': {
            'put': signup
        },
        '/auth/login': {
            'post': login
        },
        '/auth/logout': {
            'post': logout
        },
        '/news/': {
            'get': news,
            'put': createNews,
        },
        '/news/{id}': {
            'post': updateNews,
            'delete': deleteNews,
        },
        '/news/my': {
            'get': myNews
        },
        '/news/all': {
            'get': allNews
        },
        '/news/tags': {
            'get': tags
        },
        '/news/read': {
            'post': read
        },
        '/user/authors': {
            'get': authors
        },
        '/user/me': {
            'get': me,
            'post': updateMe
        },
        '/admin/users': {
            'get': adminUsers
        },
        '/admin/user/{id}/news': {
            'get': adminUserNews,
        },
        '/admin/user/{id}': {
            'post': adminUserUpdate,
            'delete': adminUserDelete
        },
        '/admin/news/{id}': {
            'post': adminNewsUpdate,
            'delete': adminNewsDelete
        },
        '/admin/news/tags': {
            'post': adminNewsTagsUpdate,
        },
    },
}