const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
router.use(multer().any());


router.post('/fileup',(req,res)=>{
	var files = req.files[0];
	var json = req.body;
	console.log(req);
	// console.log(req);
	// fs.writeFileSync('./routes/'+f.originalname,f.buffer);
	// res.send({type:"图片录入成功",path:'./routes/'+f.originalname,cont:f.buffer});
})







module.exports = router;