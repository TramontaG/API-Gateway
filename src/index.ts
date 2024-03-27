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

httpsApp.get('/', (req, res) => {
	res.send('ok');
});

setupProxies(app, ROUTES);
setupProxies(httpsApp, ROUTES);

app.use((req, res, next) => {
	console.log(req.url);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

https
	.createServer(
		{
			key: fs.readFileSync('./Certs/server.key'),
			cert: fs.readFileSync('./Certs/server.cert'),
		},
		httpsApp
	)
	.listen(4433, () => {
		console.log(`Example app listening at https://localhost:${4433}`);
	});
