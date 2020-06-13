const express = require('express');
const router = express.Router();

const URL = require('../schema/URL');

router.get('/:urlCode', async (req, res) => {
  try {
    const { urlCode } = req.params;

    const url = await URL.findOne({ urlCode });

    if (url) {
      res.redirect(url.longURL);
    } else {
      res
        .status(404)
        .json({
          success: false,
          error: { code: '003', message: 'URL not found' },
          data: {},
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: { code: `002`, message: 'Internal Error' },
        data: {},
      });
  }
});

module.exports = router;
