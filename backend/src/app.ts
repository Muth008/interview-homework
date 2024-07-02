import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/index';
import productRouter from './routes/product.route'
import shipmentRouter from './routes/shipment.route'
import statusRouter from './routes/status.route'
import healthRouter from './routes/health.route'

export const app = express();

/**
 * Middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet())

/**
 * Routes
 */
app.use('/api/', indexRouter);
app.use('/api/product', productRouter)
app.use('/api/shipment', shipmentRouter)
app.use('/api/status', statusRouter)
app.use('/api/health', healthRouter)

export default app;
