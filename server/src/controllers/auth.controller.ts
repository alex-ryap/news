import express from 'express'
const router = express.Router()

import createHttpError from 'http-errors'
import AuthService from '../services/auth.service'

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.put('/signup', (req, res) => {
  const {login, password} = req.body
  if(!login || !password) {
    throw new createHttpError.BadRequest()
  }
  AuthService.signup(login, password)
  res.sendStatus(201)
})

router.post('/login', (req, res) => {
  const {login, password} = req.body
  if(!login || !password) {
    throw new createHttpError.BadRequest()
  }
  const token = AuthService.authorize(login, password)
  res.status(200).json({token})
})

router.post('/logout', (req, res) => {
  const token = req.header('token')
  AuthService.logout(token)
  res.send(204)
})

export default router
