import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const port = process.env.PORT || '3002';
app.listen(port, () => {
	console.log(`Server running at port ${port}`);
});
