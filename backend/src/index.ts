import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import agentRoutes from './Routes/agents'; 

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());


if (typeof agentRoutes === 'function') {
    app.use('/api/agents', agentRoutes);
} else {
    console.error("❌ Error: agentRoutes is not a valid router! Check your export default.");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});