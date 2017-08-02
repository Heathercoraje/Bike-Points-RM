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
	const TFLurl = `https://api.tfl.gov.uk/BikePoint/Search?query=${searchInput}&app_id=${TFL_ID}&app_key=${TFL_KEY}`;
	const options = {
		uri: TFLurl,
		json: true // // Automatically parses the JSON string in the response
	};
	rp(options)
		.then((body) => {
			const bikePointId = body[0].id;
			options.uri = `https://api.tfl.gov.uk/BikePoint/${bikePointId}?app_id=&app_key=`;
			// console.log(options);
			return rp(options)
				.then((body) => {
					var numOfBikes = body.additionalProperties[6].value;
					var numOfEmptyDocks = body.additionalProperties[7].value;
					const objToSend = {
						'numOfBikes': numOfBikes,
						'numOfEmptyDocks': numOfEmptyDocks,
					}
					res.writeHead(200, 'Content-Type: application/json');
					res.end(JSON.stringify(objToSend));
				})
		})
		.catch((err) => {
			res.end(JSON.stringify('input incorrect station'));
		});
}

module.exports = {
	handleHomeRoute,
	handlePublic,
	handleSearch
}