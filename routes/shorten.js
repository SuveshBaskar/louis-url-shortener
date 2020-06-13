const express = require('express');
const router = express.Router();
const validURL = require('valid-url');
const shortid = require('shortid');

const config = require('../config.json');
const URL = require('../schema/URL');

const baseURL = config.URL.APP;

router.post('/', async (req, res) => {
  try {
    const { longURL } = req.body;

    if (validURL.isUri(longURL)) {
      let url = await URL.findOne({ longURL });

      if (url) {
        res.status(200).json({ success: true, data: { url } });
      } else {
        const urlCode = shortid.generate();
        const shortURL = `${baseURL}/${urlCode}`;

        url = new URL({
          urlCode,
          longURL,
          shortURL,
        });

        await url.save();

        res.status(200).json({ success: true, data: { url } });
      }
    } else {
      res.status(403).json({
        success: false,
        error: { code: `001`, message: 'Invalid URL' },
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
