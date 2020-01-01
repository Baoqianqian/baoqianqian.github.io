const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

router.post('/mkdir',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = req.body;
	console.log(json);
	var type = true;
	for (i in json) {
		if(json[i] == ''){
			type = false;
		}
	}
	if(type){
		var vip = eval(fs.readFileSync('./routes/login.txt','utf8'));
		var user_type=true;
		// console.log(vip);
		for(var i=0;i<vip.length;i++){
			if(vip[i].id == json.id){
				user_type = false;
				var dir_type=false;
				for(var j=0;j<vip[i].files.length;j++){
					console.log(vip[i].files[j].dir_name)
					if(vip[i].files[j].dir_name == json.dir_name){
						dir_type = true;
					}
				}
				if(dir_type){
					res.send({type:'文件夹已重复'})
				}else{
					fs.mkdirSync('./routes/'+json.id+'/'+json.dir_name);
					vip[i].files.push({
						"dir_name":json.dir_name,
						"file":[]
					})
					fs.writeFileSync('./routes/login.txt',JSON.stringify(vip),'utf8');
					res.send({
						type:'可以',
						file:vip[i].files
					});
				}
			}
		}
		if(user_type){
			res.send({type:'未知错误'})
		}
	}else{
		res.send({type:'参数缺失'})
	}
})

module.exports = router;
