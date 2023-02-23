import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { baseConfig } from './config/baseConfig';
import initUserRoutes from './features/auth/authRoutes';
import initPostRoutes from './features/post/postRoutes';
dotenv.config();
const app = express();

// Setup CORS
// Origin mustn't be set by * if you are using cookie
app.use(cors({ credentials: true, origin: baseConfig.origin }));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
initUserRoutes(app);
initPostRoutes(app);

app.listen(baseConfig.port, () => {
  console.log(`Server running at port ${baseConfig.port}`);
});
