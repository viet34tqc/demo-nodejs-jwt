import * as dotenv from 'dotenv';
import express from 'express';
import initUserRoutes from './features/auth/authRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || '3002';

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
initUserRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
