import UpdateNewsRequest from '../dto/update-news.request'
import GetMyNewsResponse from '../dto/get-my-news.response'
import { GetNewsRequest } from '../dto/get-news.request'
import NewsResponse from '../dto/get-news.response'
import { AuthData, Role } from '../entities/AuthData'
import News, { State } from '../entities/News'
import Storage from './storage'
import createHttpError from 'http-errors'

export default class NewsService {
  public static getAllNews(publishedOnly?: boolean) {
    const newsArray =
      publishedOnly ?
        Storage.publishedNews :
        Storage.news
    const news = newsArray.map(item => {
      const user = Storage.users.get(item.author)
      return new NewsResponse({
        ...item,
        authorNickname: user.nickname,
        authorFirstName: user.firstName,
        authorLastName: user.lastName,
        tags: [...item.tags]
      })
    })
    return news
  }

  public static getNewsByUser(userId: number) {
    const user = Storage.users.get(userId)
    if (!user) {
      throw new createHttpError.NotFound()
    }
    const news = Storage.publishedNews
      .filter(item => !user.myNewsList.includes(item.id))
      .map(item => {
      return new NewsResponse({
        ...item,
        authorNickname: user.nickname,
        authorFirstName: user.firstName,
        authorLastName: user.lastName,
        tags: [...item.tags]
      })
    })
    return news
  }

  public static getMyNews(authData: AuthData) {
    const user = Storage.users.get(authData.userId)
    const news = Storage.news
      .filter(item => user.myNewsList.includes(item.id))
      .map(item => {
      return new GetMyNewsResponse({
        ...item,
        tags: [...item.tags]
      })
    })
    return news
  }

  public static getNewsFilteredPaginated(req: GetNewsRequest, authData: AuthData) {
    let news = Storage.publishedNews
    if (req.tags && req.tags.length) {
      news = news.filter(item => req.tags.find(tag => item.tags.has(tag)))
    }
    if (req.onlyNew) {
      const user = Storage.users.get(authData.userId)
      news = news.filter(item => !user.readNewsList.has(item.id))
    }
    if (req.author) {
      news = news.filter(item => item.author === req.author)
    }
    if (req.header) {
      news = news.filter(item => item.header.includes(req.header))
    }

    const { offset = 0, limit = 20 } = req

    const res = news.sort((a,b) => {
      const [key, order] = [req.field, req.order]
      const sign = order === 'desc' ? -1 : 1
      if (a[key] < b[key]) {
        return -1*sign
      }
      return sign
    }).slice(offset, offset+limit).map(item => {
      const user = Storage.users.get(item.author)
      return new NewsResponse({
        ...item,
        authorNickname: user.nickname,
        authorFirstName: user.firstName,
        authorLastName: user.lastName,
        tags: [...item.tags]
      })
    })
    return {list: res, offset, limit, total: news.length}
  }

  public static createNews(req: UpdateNewsRequest, auth: AuthData) {
    const news = new News({
      ...req,
      author: auth.userId,
      tags: new Set(req.tags),
      publicationDate: req.publicationDate ?? (req.state === State.published && new Date())
    })
    const id = Storage.addNews(news)
    const user = Storage.users.get(auth.userId)
    user.myNewsList.push(id)
    return id
  }

  public static updateNews(id: number, req: UpdateNewsRequest, auth: AuthData) {
    const oldNews = Storage.news.find(item => item.id===id)
    if(oldNews.author !== auth.userId) {
      throw new createHttpError.NotFound()
    }
    oldNews.tags = new Set(req.tags)
    oldNews.publicationDate = req.publicationDate ?? (oldNews.state === State.draft && req.state === State.published && new Date())
    oldNews.state = req.state
    oldNews.header = req.header
    oldNews.description = req.description
  }

  public static deleteNews(id: number, auth: AuthData) {
    const news = Storage.news.find(item => item.id===id)
    if(news.author !== auth.userId && auth.role < Role.admin) {
      throw new createHttpError.NotFound()
    }
    if(news.state === State.published || auth.role < Role.admin) {
      throw new createHttpError.Forbidden()
    }
    Storage.news = Storage.news.filter(item => item.id === id)
  }

  public static getTags() {
    return [...Storage.tags]
  }

  public static updateReadNews(ids: number[], auth: AuthData) {
    const user = Storage.users.get(auth.userId)
    ids.forEach(id => user.readNewsList.add(id))
  }

}
