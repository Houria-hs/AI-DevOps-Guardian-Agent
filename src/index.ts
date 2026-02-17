import express from 'express';
import cors from 'cors';
import analyzeRouter from './Routes/analyze';
import dotenv from "dotenv";


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


app.use('/analyze', analyzeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


