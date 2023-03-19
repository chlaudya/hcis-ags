const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const _logger = require('./server/utilities/logging');
const middlewareRoute = require('./server/middleware/middlewareRoute');
const packagejson = require('./package.json');
const keycloakMiddleware = require('./server/middleware/keycloakMiddleware');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const csrfProtection = csrf({
  cookie: true
});

dotenv.config();
const PORT = process.env.PORT || 5000;
const BASEPATH = packagejson.homepage;

app.use(express.json({ extended: false }));
app.use(compression());
app.use(cors({ credentials: true, origin: PORT }));
app.use((req, res, next) => {
  middlewareRoute();
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
  next();
});

app.use(cookieParser());

app.use(csrfProtection);
app.use(function (req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

app.use(BASEPATH + '/api/v1/auth', require('./server/routes/authRoute'));
app.use(BASEPATH + '/api/v1/authorization', require('./server/routes/keycloakRoute'));

//define keycloak middleware for route API
//app.use(keycloakMiddleware);
// app.use(BASEPATH + '/legacy-api', keycloakMiddleware, require('./server/routes/legacyApiRoute'));
app.use(BASEPATH + '/keycloak-api', require('./server/routes/keycloakApiRoute'));
app.use(`${BASEPATH}/hcis-api`, keycloakMiddleware, require('./server/routes/hcisApiRoute'));
//-----
if (process.env.NODE_ENV === 'production') {
  app.use(BASEPATH, express.static(path.join(__dirname, './client/')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API Running'));
}

app.get(BASEPATH + '/api/ping', (req, res) => res.send('PING'));

app.listen(PORT, () =>
  _logger.info(
    `Server started on port ${PORT} mode ${process.env.NODE_ENV} base path : ${BASEPATH}`
  )
);
