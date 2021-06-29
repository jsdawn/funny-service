const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const router = express.Router();

router.get('/demo', async (_req, res) => {
  res.json({
    status: 200,
    data: { msg: 'demo api' }
  });
});

router.post('/upload', (req, res, next) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, '../../public/files')
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    if (files.file) {
      let file = files.file;
      const oldPath = file.path;
      const newName = Date.now() + file.name;
      const newPath = path.join(path.dirname(oldPath), newName);
      fs.rename(oldPath, newPath, err => {
        if (err) {
          next(err);
          return;
        }
        res.json({
          status: 200,
          data: { path: 'http://127.0.0.1:3000/static/files/' + newName }
        });
      });
    }
  });
});

module.exports = router;
