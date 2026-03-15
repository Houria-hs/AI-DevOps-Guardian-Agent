import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import agentRoutes from './Routes/agents'; 

dotenv.config();

const app = express();

// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = [
//             'https://gentle-field-0c500fe1e.4.azurestaticapps.net',
//             'http://localhost:3000',
//             'http://localhost:5173'
//         ];
//         // Allow requests with no origin (like mobile apps or curl) 
//         // or check if origin is in the allowed list
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200 
// }));

app.options('*', cors());

app.use(express.json());


if (typeof agentRoutes === 'function') {
    app.use('/api/agents', agentRoutes);
} else {
    console.error("❌ Error: agentRoutes is not a valid router! Check your export default.");
}

const PORT = process.env.PORT || 8080; 

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});