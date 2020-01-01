const express = require("express");
const app = express();

const txfiles = require('./routes/txfile');
const loginups = require('./routes/loginup');
const loginins = require('./routes/loginin');
const mkdirs = require('./routes/mkdir');
const files = require('./routes/filetodir');

app.use(express.urlencoded({}));
app.use('/files',txfiles);
app.use('/login',loginups);
app.use('/login',loginins);
app.use('/dir',mkdirs);
app.use('/file',files);




app.use(express.static('./public'));
app.listen(8000,function(){
	console.log('ok')
})