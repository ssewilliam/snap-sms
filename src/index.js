import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;
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

app.listen(port);
logger(`Find me on http://localhost:${port}`);

export default app;
