const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
