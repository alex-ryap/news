import UpdateMeRequest from '../dto/update-me.request'
import GetAuthorResponse from '../dto/get-author.response'
import GetMeResponse from '../dto/get-me.response'
import {AuthData, getRole, Role} from '../entities/AuthData'
import User from '../entities/User'
import Storage from './storage'
import createHttpError from 'http-errors'

export default class UserService {
  public static getMe(authData: AuthData) {
    const user = Storage.users.get(authData.userId)
    return new GetMeResponse({
      ...user,
      role: getRole(authData.role)
    })
  }
  public static updateMe(req: UpdateMeRequest, authData: AuthData) {
    let user: User
    if(!authData.userId) {
      user = new User({...req, tags: []})
      authData.userId = Storage.addUser(user)
    } else {
      user = Storage.users.get(authData.userId)
      user.firstName = req.firstName
      user.lastName = req.lastName
      user.nickname = req.nickname
      user.phone = req.phone
      user.showFirstName = req.showFirstName
      user.showLastName = req.showLastName
      user.showPhone = req.showPhone
    }
    return authData.userId
  }

  public static updateMyTags(tags: string[], authData: AuthData) {
    let user: User
    if(!authData.userId) {
      throw new createHttpError.NotFound('User not found!')
    } else {
      user = Storage.users.get(authData.userId)
      user.tags = tags
    }
  }

  public static getAuthors() {
    const authors = new Array<GetAuthorResponse>();
    [...Storage.authorities.values()].filter(item => item.role >= Role.writer).forEach(item => {
      authors.push(Storage.users.get(item.userId))
    })
    return authors
  }
}
