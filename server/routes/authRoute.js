const express = require('express');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

router.get('/csrf', async (req, res) => {
  try {
    res.json({
      CSRFToken: req.csrfToken(),
    });
  } catch (error) {
    res.status(400).json(error.data);
  }
});

module.exports = router;
