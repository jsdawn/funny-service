const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const request = require('request');

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

  form.parse(req, (err, _fields, files) => {
    if (err) {
      next(err);
      return;
    }
    if (!files.file) {
      res.status(400).json({ status: 400, msg: '未上传文件' });
      return;
    }

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
  });
});

// http://127.0.0.1:3000/common/download?url=http%3A%2F%2F127.0.0.1%3A3000%2Fstatic%2Ffiles%2F16273584947416d8b088130353c59763d633671046898.jpg
router.get('/download', (req, res, _next) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ status: 400, msg: '未知资源路径' });
    return;
  }

  //创建文件夹目录
  const dirPath = path.join(__dirname, '../../public/download');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const fileName = path.basename(url);
  const filePath = path.join(dirPath, fileName);
  const ws = fs.createWriteStream(filePath, {
    autoClose: true
  });
  request(url).pipe(ws);
  ws.on('finish', function () {
    const stream = fs.createReadStream(filePath);

    res.set({
      'Content-Type': 'application/force-download;charset=utf-8',
      'Content-Disposition': `attachment;filename=${fileName}`,
      'Content-Transfer-Encoding': 'binary'
    });
    stream.pipe(res);
    stream.on('end', function () {
      //下载成功后删除源文件
      fs.unlink(filePath, () => {});
    });
  });
});

module.exports = router;
