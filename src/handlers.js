const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

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
	var searchInput = req.url.split('=')[1];
	console.log(searchInput);
	const TFLurl = `https://api.tfl.gov.uk/BikePoint/Search?query=${searchInput}&app_id=&app_key=`;
	var options = {
		uri: TFLurl,
		json: true
	};
	rp(options)
		.then((body) => {
			console.log(body);
			var bikePointId = body[0].id;
			console.log(bikePointId);
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
