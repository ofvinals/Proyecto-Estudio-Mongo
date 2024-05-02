const { Router } = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const { upload, handleFileUpload } = require('../controllers/upload.controller.js');

const router = Router();

router.post('/uploads',  upload.single('file'), handleFileUpload);

module.exports = router;
