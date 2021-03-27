const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

//middleware & static
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/products', productRoutes);
app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
