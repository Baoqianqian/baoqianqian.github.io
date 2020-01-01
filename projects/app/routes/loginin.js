const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();


router.post('/in',function(req,res){
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
		var user_type_in = false;
		var vip = eval(fs.readFileSync('./routes/login.txt','utf8'));
		for(var i=0;i<vip.length;i++){
			if(vip[i].id==json.id && vip[i].pass==json.pass){
				user_type_in = true;
			}
		}
		if(user_type_in){
			res.send({
				type:"登录成功",
				id:json.id
			});
		}else{
			res.send({type:'账号密码不匹配'});
		}
	}else{
		res.send({type:'参数缺失'})
	}
})

module.exports = router;