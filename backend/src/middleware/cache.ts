import { NextFunction, Request, Response, Send } from 'express';
import Cache from 'node-cache';
const cache = new Cache();

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Иззначально будем считать что кэш не попал
  res.set({
    'X-Cache': 'MISS',
  });
  // Проверим не пытаемся ди менять данные
  if (req.method !== 'GET') {
    const originalSend = res.send.bind(res);
    res.send = (body: Send) => {
      //Если изменения прошли успешно, то сбросим кэш.
      if (res.statusCode < 300 && res.statusCode > 199) {
        cache.flushAll();
      }
      return originalSend(body);
    };
    next();
  } else {
    const key = req.originalUrl;
    const cachedData = cache.get(key);
    if (cachedData) {
      // Если кэш попал, то отправим его и пометим ответ
      res.set({
        'X-Cache': 'HIT',
      });
      return res.send(cachedData);
    }
    const originalSend = res.send.bind(res);
    res.send = (body: Send) => {
      cache.set(key, body);
      return originalSend(body);
    };
    next();
  }
};

export default cacheMiddleware;
