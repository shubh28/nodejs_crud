var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

var User = require('./models/users.js');
mongoose.connect('mongodb://localhost/nodeauth');

router.use(function(req,res,next){
	console.log('Something is happening');
	next();
});

router.get('/',function(req,res){
	res.json({message:'Welcome to the REST api'});
});

router.route('/users').post(function(req,res){
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.userName = req.body.userName;
	user.password = req.body.password;

	user.save(function(err){
		if(err)
			res.send(err);
		res.json({message:"User created"});
	});
}).get(function(req,res){
	User.find(function(err,users){
		if(err)
			console.send(err);
		res.json(users);
	});
});

router.route('/users/:user_id').get(function(req,res){
	User.findById(req.params.user_id,function(err,user){
		if(err)
			res.send(err);
		res.json(user);
	});
}).put(function(req,res){
	User.findById(req.params.user_id,function(err,user){
		if(err)
			res.send(err);
			user.name = req.body.name;
			user.email = req.body.email;
			user.userName = req.body.userName;
			user.password = req.body.password;

			user.save(function(err){
				if(err)
					res.send(err);
				res.json({message:"SuccessFully Updated"});
			});

	});
}).delete(function(req,res){
	User.remove({_id:req.params.user_id},function(err,bear){
		if(err)
			res.send(err);
		res.json({message:"successfully deleted"});
	});
});

app.use('/api',router);

app.listen(port);

console.log("Server Started at "+ port);