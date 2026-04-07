import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import agentRoutes from './Routes/agents'; 

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/agents', agentRoutes);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("DevOps Guardian backend alive");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});