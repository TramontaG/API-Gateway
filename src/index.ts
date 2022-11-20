import express from 'express';
import morgan from 'morgan';
import { setupProxies } from './Proxy';
import { ROUTES } from './Router/routes';

const app = express()
const port = 8000;

setupProxies(app, ROUTES);

app.use(morgan("combined"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
