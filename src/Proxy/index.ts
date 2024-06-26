import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Express } from 'express';
import { Routes } from 'src/Router/routes';

export const setupProxies = (app: Express, routes: Routes[]) => {
	routes.forEach(({ source, target, changeOrigin, socketIo }) => {
		app.use(
			source,
			createProxyMiddleware({
				target,
				changeOrigin,
				ws: socketIo ?? false,
				pathRewrite: {
					[`^${source}`]: '',
				},
			})
		);
	});
};
