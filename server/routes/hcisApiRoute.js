const express = require('express');
const axios = require('axios');
const config = require('config');
const hcisApi = config.get('hcisApi');
const baseProxy = require('../proxy/baseProxy');
const router = express.Router();

router.get('/*', async (req, res) => {
  axios
    .get(hcisApi.Url + req.url)
    .then((response) => res.json(response.data))
    .catch(function (error) {
      baseProxy.errorHandling(error);
      let statusCode = error.response ? error.response.status : 500;
      res.status(statusCode).json(error);
    });
});

router.post('/*', async (req, res) => {
  axios
    .post(hcisApi.Url + req.url, req.body)
    .then((response) => res.json(response.data))
    .catch(function (error) {
      baseProxy.errorHandling(error);
      let statusCode = error.response ? error.response.status : 500;
      res.status(statusCode).json(error.response.data);
    });
});

router.put('/*', async (req, res) => {
  axios
    .put(hcisApi.Url + req.url, req.body)
    .then((response) => res.json(response.data))
    .catch(function (error) {
      baseProxy.errorHandling(error);
      let statusCode = error.response ? error.response.status : 500;
      res.status(statusCode).json(error.response.data);
    });
});

module.exports = router;
