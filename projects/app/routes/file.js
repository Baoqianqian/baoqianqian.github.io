const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

router.post('/writeFile',function(req,res){
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
				var dir_type=true;
				for(var j=0;j<vip[i].files.length;j++){
					if(vip[i].files[j].dir_name == json.dir_name){
						dir_type=false;
						fs.mkdirSync('./routes/'+json.id+'/'+json.dir_name+''+json.file_name);
						vip[i].files[j].file.push({
							"name":json.file_name,
							"cont":json.
						})
						fs.writeFileSync('./routes/login.txt',JSON.stringify(vip),'utf8');
						res.send({
							type:'可以',
							file:vip[i].files
						});
					}
				}
				if(dir_type){
					res.send({type:'文件夹已重复'})
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
