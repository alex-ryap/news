import createHttpError from 'http-errors'
import randToken from 'rand-token'
import { AuthData, Role } from '../entities/AuthData'
import Storage from './storage'

export default class AuthService {

   public static signup(login: string, password: string) {
      if ([...Storage.authorities.values()].find(item => item.login === login)) {
         throw new createHttpError.BadRequest('login already exists')
      }
      const authData = new AuthData({
         login,
         password,
         role: Role.reader
      })
      Storage.authorities.set(`${login}@${password}`, authData)
   }

   public static authorize(login: string, password: string) {
      const authData = Storage.authorities.get(`${login}@${password}`)
      if (!authData) {
         throw new createHttpError.Unauthorized()
      }
      const oldAuthKey = [...Storage.authorized].find(([key, value]) => value.login===login)?.[0]
      if (oldAuthKey) {
         Storage.authorized.delete(oldAuthKey)
      }
      const token = this.tokenGenerator()
      Storage.authorized.set(token, authData)
      return token

   }

   public static checkAuthorized(token: string) {
      const authData = Storage.authorized.get(token)
      if (!authData) {
         throw new createHttpError.Unauthorized()
      }
      return authData
   }

   public static checkAuthorizedAdmin(token: string) {
      const authData = Storage.authorized.get(token)
      if (!authData) {
         throw new createHttpError.Unauthorized()
      }
      if (authData.role < Role.admin) {
         throw new createHttpError.Forbidden()
      }
      return authData
   }

   public static checkAuthorizedWriter(token: string) {
      const authData = Storage.authorized.get(token)
      if (!authData) {
         throw new createHttpError.Unauthorized()
      }
      if (authData.role < Role.writer) {
         throw new createHttpError.Forbidden()
      }
      return authData
   }

   public static logout(token: string) {
      const authData = Storage.authorized.get(token)
      if (!authData) {
         throw new createHttpError.Unauthorized()
      }
      Storage.authorized.delete(token)
   }

   private static tokenGenerator() {
      return randToken.generate(16)
   }
}
