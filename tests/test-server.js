const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');

test('Home Router', (t) => {
	shot.inject(router, {method: 'GET', url: '/'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
		t.end();
	})
})

test('Unknow uri', (t) => {
	shot.inject(router, {method: 'GET', url: '/lumos'}, (response) => {
		t.equal(response.statusCode, 404, 'Should respond with status code 404');
		t.equal(response.payload, '<h1>404 file not found</h1>', 'Should return 404 not found');
		t.end();
	})
})

test('test public', (t) => {
	shot.inject(router, {method: 'GET', url: '/public/style.css'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
	})
	shot.inject(router, {method: 'GET', url: '/public/reset.css'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
	})
	shot.inject(router, {method: 'GET', url: '/public/index.js'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
	})
	shot.inject(router, {method: 'GET', url: '/public/blah.css'},(response) => {
		t.equal(response.statusCode, 500, 'Should response with status code 500');
		t.end();
	})
})

test('test search', (t) => {
	shot.inject(router, {method: 'GET', url: '/search'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
		t.end();
	})
})

test('test autocomplete widget', (t) => {
	shot.inject(router, {method: 'GET', url: '/auto'}, (response) => {
		t.equal(response.statusCode, 200, 'Should respond with status code 200');
		t.end();
	})
})
