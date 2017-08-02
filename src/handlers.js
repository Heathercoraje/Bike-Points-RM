const fs = require('fs');
const path = require('path');
const rp = require('request-promise');
const env = require('env2')('./.env');
const TFL_ID = process.env.TFL_ID;
const TFL_KEY = process.env.TFL_KEY;

const handleHomeRoute = (res) => {
	const filePath = path.join(__dirname, '..', 'public', 'index.html')
	fs.readFile(filePath, (error, file) => {
		if (error) {
			res.writeHead(500, 'Content-Type: text/html')
			res.end('<h1> sorry, the page doesnt response </h1>')
		} else {
			res.writeHead(200, 'Content-Type: text/html')
			res.end(file);
		}
	});
}

const handlePublic = (res, url) => {
	const extensionType = {
		html: 'text/html',
		css: 'text/css',
		js: 'application/javascript',
		ico: 'image/x-icon',
		img: 'image/png'
	}[url.split('.')[1]];

	const filePath = path.join(__dirname, '..', url);
	fs.readFile(filePath, (error, file) => {
		if (error) {
			res.writeHead(500, 'Content-Type: text/html');
			res.end('<h1>Sorry something went wrong</h1>');
		} else {
			res.writeHead(200, `Content-Type:${extensionType}`);
			res.end(file)
		}
	})
}

const handleSearch = (req, res) => {
	const searchInput = req.url.split('=')[1];
	const TFLurl = `https://api.tfl.gov.uk/BikePoint/Search?query=${searchInput}&app_id=&app_key=`;
	const options = { //mn asmo a5tyrat
		uri: TFLurl, // al moke3 tb3 al searchInput
		json: true // // Automatically parses the JSON string in the response
	};
	rp(options)
		.then((body) => {
			const bikePointId = body[0].id;
			options.uri =`https://api.tfl.gov.uk/BikePoint/${bikePointId}?app_id=&app_key=`;
			console.log(options);
			return rp(options)
			.then((body) =>{
				console.log(body);
			})
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = {
	handleHomeRoute,
	handlePublic,
	handleSearch
}

//${} var
// hay a7san 3shan ekon ashe asr3 m7al ma ndal nkteb kol kleme l7al b string metl 1 mn7othen m3 m3ed b 2
// 1. 'hello' + searchInput + 'world'
// 2. `hello ${searchInput}`

// req badha callback *(errr, res, body)* al rp badhash