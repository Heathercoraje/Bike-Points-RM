const {handleHomeRoute, handlePublic, handleSearch, handleAuto} = require('./handlers');

const router = (req, res) => {
	const url = req.url;

	if (url === '/') {
		handleHomeRoute(res);
	} else if (url.indexOf('/public') === 0) {
		handlePublic(res, url);
	} else if (url.indexOf('/search') === 0) {
		handleSearch(req, res);
	} else if (url.indexOf('/auto') !== -1) {
		handleAuto(req, res);
	} else {
		res.writeHead(404, 'Content-Type: text/html')
		res.end('<h1>404 file not found</h1>');
	}
};

module.exports = router;
