import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 
import bodyParser from 'body-parser';
import productRouter from './routes/productRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 4444;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// API Endpoints
app.use('/api/products', productRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Welcome to Trendmart API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});