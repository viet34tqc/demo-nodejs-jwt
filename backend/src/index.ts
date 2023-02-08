import * as dotenv from 'dotenv';
import express from 'express';
import initDB from '../config/connectDB';

dotenv.config();
const app = express();
const port = process.env.PORT || '3002';

initDB().catch((e) => console.log(e.message));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
