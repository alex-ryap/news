import express from 'express'
import UpdateMeRequest from '../dto/update-me.request'
const router = express.Router()
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/authors', (req, res) => {
  const token = req.header('token')
  AuthService.checkAuthorized(token)
  const authors = UserService.getAuthors()
  res.status(200).json(authors)
})

router.put<{}, any, any, string[]>('/me/tags', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  const tags = req.body
  UserService.updateMyTags(tags, authData)
  res.sendStatus(204)
})

router.get('/me', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  const me = UserService.getMe(authData)
  res.status(200).json({me})
})

router.put<{}, any, any, UpdateMeRequest>('/me', (req, res) => {
  const token = req.header('token')
  const authData = AuthService.checkAuthorized(token)
  const body = req.body
  const id = UserService.updateMe(body, authData)
  res.status(200).json({id})
})

export default router
