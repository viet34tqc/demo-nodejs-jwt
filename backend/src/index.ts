import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import initUserRoutes from './features/auth/authRoutes';
import initPostRoutes from './features/post/postRoutes';
dotenv.config();
const app = express();
const port = process.env.PORT || '3002';

// Setup CORS
app.use(
  cors({
    origin: '*'
  })
);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
initUserRoutes(app);
initPostRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
