const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/music', {
	useUnifiedTopology: true,
	  useNewUrlParser: true
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	  extended: false
}));
const upload = multer({
	  dest: '../front-end/public/images/',
	  limits: {
		      fileSize: 10000000
		    }
});
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
	name: 'session',
	keys: ['secretValue'],
	cookie: {
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	}
}));
/*
const accountSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
});

const Account = mongoose.model('account', accountSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
	if (!req.file) {
		    return res.sendStatus(400);
		  }
	  res.send({
		      path: "/images/" + req.file.filename
		    });
});

app.post('/api/accounts', async (req, res) => {
	  const account = new Account({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password

		    });
	  try {
		      await account.save();
		  console.log(account.id);
		      res.send(account);
		    } catch (error) {
			        console.log(error);
			        res.sendStatus(500);
			      }
});

app.get('/api/accounts', async (req, res) => {
	  try {
		      let items = await Account.find();
		      res.send(items);
		    } catch (error) {
			        console.log(error);
			        res.sendStatus(500);
			      }
});
*/
app.delete('/api/items/:id', async (req, res) => {
	try {
		await Item.deleteOne({_id: req.params.id});
		res.sendStatus(200);
	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});
app.put('/api/items/:id', async (req, res) => {
	try {
		let item = await Item.findOne({
			_id: req.params.id
		});
		item.title= req.body.title;
		item.description=req.body.description;
		await item.save();
		res.send(item);

	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);
const students = require("./students.js");
app.use("/api/students", students.routes);
app.listen(3001, () => console.log('Server listening on port 3001!'));
