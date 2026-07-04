const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cookies',     require('./routes/cookies'));
app.use('/api/categories',  require('./routes/categories'));
app.use('/api/brands',      require('./routes/brands'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/allergens',   require('./routes/allergens'));
app.use('/api/reviews',     require('./routes/reviews'));
app.use('/api/stats',       require('./routes/stats'));

app.get('/', (req, res) => res.json({ name: 'Cookie Inventory API', version: '1.0.0' }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const shutdown = () => { server.close(() => process.exit(0)); };
process.on('SIGINT',  shutdown);
process.on('SIGTERM', shutdown);
