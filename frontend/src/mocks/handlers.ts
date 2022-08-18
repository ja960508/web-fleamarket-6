import { rest } from 'msw';
import { productGenerator, userGenerator } from './data';

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userGenerator()));
  }),
  rest.get('/api/product/:productId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productGenerator(5)));
  }),
  rest.get('/api/product', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productGenerator()));
  }),
];
