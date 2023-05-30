import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import initPostRoutes from './features/post/postRoutes';

const app = express();

// Import baseConfig after running dotenv
import { baseConfig } from './config/baseConfig';
import initAuthRoutes from './features/auth/authRoutes';
import initCommentRoutes from './features/comment/commentRoutes';

// Setup CORS
// Origin mustn't be set by * if you are using cookie
app.use(cors({ credentials: true, origin: baseConfig.origin }));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
initAuthRoutes(app);
initPostRoutes(app);
initCommentRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
