import * as dotenv from 'dotenv';
import express from 'express';
import initUserRoutes from './features/auth/authRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || '3002';

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
initUserRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
