const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
