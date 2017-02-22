var classModel = require('../modules/my_class');

module.exports = function(app) {
  app.get('/', function (req, res) {
 		res.render('index');
  });

  app.get('/api/', function (req, res) {
  	console.log("收到查询请求");
  	classModel.find({}, function(err, result) {
  		if(err) return console.log(err);
  		res.send({result})
  		//console.log(result);
  	});
  });

  //增加学生信息

  app.post('/api/', function(req, res) {
  	var newStudent = [{
  		name: req.body.name,
  		studentId: req.body.studentId,
  		age: req.body.age,
  		tel: req.body.tel,
  		email: req.body.email,
  		address: req.body.address
  	}];
  	classModel.create(newStudent, function(err) {
  		if(err) return console.log(err);
  		res.send({ok:1});
  	});
  });

  //删除学生信息
  app.post('/api/del', function(req, res) {
  	classModel.remove({_id: req.body._id}, function(err) {
  		if(err) return console.log(err);
  		res.send({ok:1});
  	})
  })

  //修改学生信息
  app.post('/api/update/:id', function(req, res) {
  		console.log("更新用户信息",req.params.id);
  		var newStudent = {
	  		name: req.body.name,
	  		studentId: req.body.studentId,
	  		age: req.body.age,
	  		tel: req.body.tel,
	  		email: req.body.email,
	  		address: req.body.address
	  	};
  		classModel.update({_id: req.params.id}, newStudent, function(err, result) {
  			if(err) {
  				console.log(err);
  				res.send('错啦！');
  			}
  			console.log(result);
  			res.send({ok:result.ok});
  		});
  	});
  	//查找学生信息
  	app.get('/reach', function(req, res) {
  		var result = null;
  		res.render('reach', { result })
  	});
  	app.post('/reach', function(req, res) {
  		console.log(req.body);
  		var response = res;
  		var reachType = req.body.reach_type,
  			keyWord = req.body.keyword;
  		if(reachType == 0) {
  			classModel.find({name: keyWord}, function(err, result) {
  				if(err) return console.log(err);
  				response.render('reach', {result})
  			});
  		} else {
  			classModel.find({studentId: keyWord}, function(err, result) {
  				if(err) return console.log(err);
  				response.render('reach', {result})
  			});
  		}
  	});
};
