const express = require('express');
const axios = require('axios');
const config = require('config');
const keycloak = config.get('keycloak');
const baseProxy = require('../proxy/baseProxy');
const router = express.Router();

router.get('/*', async (req, res) => {
  axios
    .get(keycloak.Url + req.url, {
      headers: { Authorization: req.headers.authorization }
    })
    .then((response) => res.json(response.data))
    .catch(function (error) {
      baseProxy.errorHandling(error);
      res.status(error.response.status || 500).json(error.response || error);
    });
});

router.post('/*', async (req, res) => {
  axios
    .post(keycloak.Url + req.url, req.body, req.headers)
    .then((response) => res.json(response.data))
    .catch(function (error) {
      baseProxy.errorHandling(error);
      res.status(error.response.status).json(error.response.data);
    });
});
module.exports = router;
