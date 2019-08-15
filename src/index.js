import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import env from './config/env';

const app = express();
const port = env.APP_PORT;
const logger = debug('log');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use('/api/v1', routes);

app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the Api',
}));

if (process.env.NODE_ENV !== 'test') {
  logger(port);
  app.listen(port);
}

logger(`Find me on http://localhost:${port}`);

export default app;
