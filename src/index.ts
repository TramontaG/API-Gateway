import express from 'express';
import https from 'https';
import { setupProxies } from './Proxy';
import { ROUTES } from './Router/routes';
import fs from 'fs';

const app = express();
const httpsApp = express();
const port = 8000;

[app, httpsApp].forEach(instance => {
	instance.use('/', (req, res, next) => {
		console.log(`[${new Date().toISOString()}] ${req.url}`);

		next();
	});
});

setupProxies(app, ROUTES);

app.listen(port);
