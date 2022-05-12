import GetUsersAdminResponse from '../dto/get-users-admin.response'
import UpdateNewsRequest from '../dto/update-news.request'
import {AuthData, Role} from '../entities/AuthData'
import {State} from '../entities/News'
import Storage from './storage'
import createHttpError from 'http-errors'

export default class AdminService {
  public static getUsers() {
    const authorities = new Map<number, AuthData>();
    [...Storage.authorities.values()].forEach(auth => authorities.set(auth.userId, auth))
    const users = [...Storage.users.values()].map(user => (new GetUsersAdminResponse({
      ...user,
      ...authorities.get(user.id)
    })))
    return users
  }

  public static updateUserRole(id: number, roleString: string) {
    const user = [...Storage.authorities.values()].find(auth => auth.userId === id)
    if (!user) {
      throw new createHttpError.NotFound()
    }
    const role = Object.values(Role).find((item) => typeof item=== 'number' && Role[item] === roleString)
    if (typeof role !== 'number') {
      throw new createHttpError.BadRequest('Role does not exist')
    }
    user.role = role
  }

  public static deleteUser(id: number) {
    const [key, data] = [...Storage.authorities].find(([_,auth]) => auth.userId === id)
    Storage.authorized.delete(data.token)
    Storage.authorities.delete(key)
    Storage.users.delete(id)
  }

  public static updateNews(id: number, news: UpdateNewsRequest) {
    const oldNews = Storage.news.find(item => item.id===id)
    oldNews.tags = new Set(news.tags)
    oldNews.publicationDate = news.publicationDate ?? (oldNews.state === State.draft && news.state === State.published && new Date())
    oldNews.state = news.state
    oldNews.header = news.header
    oldNews.description = news.description
  }

  public static updateTags(tags: string[]) {
    Storage.tags = new Set(tags)
  }

  public static deleteNews(id: number) {
    Storage.news = Storage.news.filter(item => item.id !== id)
  }
}
