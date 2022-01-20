const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./src/routes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
