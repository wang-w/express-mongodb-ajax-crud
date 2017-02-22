var mongoose = require('mongoose');
//连接mongdb
mongoose.connect('mongodb://localhost/text')
//实例化连接对象
var db = mongoose.connection;
db.on('error', console.error.bind(console,'连接错误：'));
db.once('open', function(callback) {
	console.log('MongDB连接成功！！');
});

//创建schema
var classSchema = new mongoose.Schema({
	name: String,
	studentId: Number,
	age: Number,
	tel: Number,
	email: String,
	address: String
});

//创建model
var classModel = mongoose.model('newClass', classSchema);
module.exports = classModel;