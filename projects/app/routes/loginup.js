const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

router.post('/up',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = req.body;
	// console.log(json);
	var type = true;
	for (i in json) {
		if(json[i] == ''){
			type = false;
		}
	}
	if(type){
		var vip = eval(fs.readFileSync('./routes/login.txt','utf8'));
		var user_type=true;
		for(var i=0;i<vip.length;i++){
			if(vip[i].id == json.id){
				user_type = false;
			}
		}
		if(user_type){
			json.files = [];
			vip.push(json);
			fs.mkdirSync('./routes/'+json.id);
			fs.writeFileSync('./routes/login.txt',JSON.stringify(vip),'utf8');
			res.send({type:'注册成功',data:""});
		}else{
			res.send({type:'用户已存在'})
		}
	}else{
		res.send({type:'参数缺失'})
	}
})


router.get('/file',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = req.query;
	// console.log(json);
	var type = true;
	for (i in json) {
		if(json[i] == ''){
			type = false;
		}
	}
	if(type){
		var user_type_in = false;
		var vip = eval(fs.readFileSync('./routes/login.txt','utf8'));
		for(var i=0;i<vip.length;i++){
			if(vip[i].id == json.id){
				user_type_in = true;
				res.send({
					type:"登录成功",
					file:vip[i].files,
					img_path:vip[i].img_path,
					username:vip[i].username,
				});
			}
		}
		if(!user_type_in){
			res.send({type:'未知错误'});
		}
	}else{
		res.send({type:'参数缺失'});
	}
})
module.exports = router;
