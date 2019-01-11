var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

//#region GET Routes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/file', (req,res) => {

	let path = './' + req.query.path;

	if (fs.existsSync(path)) {
		fs.readFile(path, (err, data) =>{

			if (err) {
				console.error(err);
				res.status(400).json({
					error: err
				});
			}else {
				res.end(data);
				res.status(200);

			}
		})
		
	}else{
		res.status(404).json({
			error: 'File not found'
		});
	}

});

//#endregion

//#region POST Routes

// route for uploads
router.post('/upload', (req, res) => {

	let form = new formidable.IncomingForm({
		uploadDir:'./upload',
		keepExtensions: true
	});

	form.parse(req, (err, fields, files)=>{
		res.json({files});
	});


});

//#endregion

//#region DELETE Routes

router.delete('/file', (req, res) => {

	let form = new formidable.IncomingForm({

		uploadDir: './upload',
		keepExtensions: true

	});

	form.parse(req, (err, fields, files) => {

		let path = "./" + fields.path;

		if (fs.existsSync(path)) {
			fs.unlink(path, err => {
				if (err){
					res.status(400).json({
						err
					});
				}else{
					res.json({
						fields
					});
				}
			});
		}

	});

});


//#endregion

// export the module
module.exports = router;
