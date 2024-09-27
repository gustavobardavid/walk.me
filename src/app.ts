import express from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(
	cors({
		origin: '*',
	})
);

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

export default app;
