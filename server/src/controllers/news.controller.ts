import express from 'express';
import UpdateNewsRequest from '../dto/update-news.request';
const router = express.Router();
import { GetNewsRequest } from '../dto/get-news.request';
import AuthService from '../services/auth.service';
import NewsService from '../services/news.service';

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/my', (req, res) => {
  const token = req.header('token');
  const authData = AuthService.checkAuthorized(token);
  const news = NewsService.getMyNews(authData);
  res.status(200).json(news);
});

router.get('/all', (req, res) => {
  const token = req.header('token');
  AuthService.checkAuthorized(token);
  const news = NewsService.getAllNews(true);
  res.status(200).json(news);
});

router.get('/tags', (req, res) => {
  const token = req.header('token');
  AuthService.checkAuthorized(token);
  const tags = NewsService.getTags();
  res.status(200).json(tags);
});

router.post<{}, any, any, { ids: string }>('/read', (req, res) => {
  const token = req.header('token');
  const authData = AuthService.checkAuthorized(token);
  NewsService.updateReadNews(req.body.ids, authData);
  res.status(204);
});

router.get<any, any, any, any, GetNewsRequest>('/', (req, res) => {
  const token = req.header('token');
  const authData = AuthService.checkAuthorized(token);
  const params = req.query;
  const news = NewsService.getNewsFilteredPaginated(params, authData);
  res.status(200).json({ news });
});

router.post<{}, any, any, UpdateNewsRequest>('/', (req, res) => {
  const token = req.header('token');
  const authData = AuthService.checkAuthorizedWriter(token);
  const body = req.body;
  const id = NewsService.createNews(body, authData);
  res.status(201).json({ id });
});

router.put<{ id: number }, any, any, UpdateNewsRequest>('/:id', (req, res) => {
  const token = req.header('token');
  const { id } = req.params;
  const authData = AuthService.checkAuthorizedWriter(token);
  const body = req.body;
  NewsService.updateNews(id, body, authData);
  res.sendStatus(204);
});

router.delete<{ id: number }>('/:id', (req, res) => {
  const token = req.header('token');
  const id = Number(req.params.id);
  const authData = AuthService.checkAuthorizedWriter(token);
  NewsService.deleteNews(id, authData);
  res.sendStatus(204);
});

export default router;
