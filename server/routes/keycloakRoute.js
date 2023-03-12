const express = require('express');
const router = express.Router();
const keycloakProxy = require('../proxy/keycloakProxy');

router.get('/menu_permission', async (req, res) => {
  try {
    let result = await keycloakProxy.menuPermission(req.headers.authorization);
    res.json(result);
  } catch (error) {
    let { status } = error.response;
    res.status(status).json(error);
  }
});
module.exports = router;
