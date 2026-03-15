import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import agentRoutes from './Routes/agents'; 

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://gentle-field-0c500fe1e.4.azurestaticapps.net");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        return res.status(200).json({});
    }
    next();
});

app.options('*', cors());

app.use(express.json());


if (typeof agentRoutes === 'function') {
    app.use('/api/agents', agentRoutes);
} else {
    console.error("❌ Error: agentRoutes is not a valid router! Check your export default.");
}

const PORT = process.env.PORT || 8080; // Azure defaults to 8080

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});