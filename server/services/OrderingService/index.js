const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001; 

require('./config/db');
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });