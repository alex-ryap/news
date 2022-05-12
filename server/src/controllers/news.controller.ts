import express from 'express'
import UpdateNewsRequest from '../dto/update-news.request'
const router = express.Router()
import { GetNewsRequest } from '../dto/get-news.request'
import AuthService from '../services/auth.service'
import NewsService from '../services/news.service'

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/my', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  const news = NewsService.getMyNews(authData)
  res.status(200).json(news)
})

router.get('/all', (req, res) => {
  const news = NewsService.getAllNews(true)
  res.status(200).json(news)
})

router.get('/tags', (req, res) => {
  const tags = NewsService.getTags()
  res.status(200).json(tags)
})

router.post<{}, any, any, {ids: string}>('/read', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  NewsService.updateReadNews(req.body.ids, authData)
  res.status(204)
})


router.get<GetNewsRequest>('/', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  const params = req.params
  const news = NewsService.getNewsFilteredPaginated(params, authData)
  res.status(200).json({news})
})

router.put<{}, any, any, UpdateNewsRequest>('/', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorizedWriter(token)
  const body = req.body
  const id = NewsService.createNews(body, authData)
  res.status(201).json({id})
})

router.post<{id: number}, any, any, UpdateNewsRequest>('/:id', (req, res) => {
  const token = req.header('token')
  const {id} = req.params
  const authData = AuthService.checkAuthorizedWriter(token)
  const body = req.body
  NewsService.updateNews(id, body, authData)
  res.sendStatus(204)
})

router.delete<{id: number}>('/', (req, res) => {
  const token = req.header('token')
  const {id} = req.params
  const authData = AuthService.checkAuthorizedWriter(token)
  NewsService.deleteNews(id, authData)
  res.sendStatus(204)
})

export default router
