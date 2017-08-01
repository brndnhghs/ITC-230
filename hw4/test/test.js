const 	assert = require('chai').assert;

const	getAll = require('../lib/records').getAll,
		search = require('../lib/records').search,
		del = require('../lib/records').delete,
		add = require('../lib/records').add;

describe('App', function(){
	describe('search', function(){

		it('on success search() should return an object', function(){
			var result = search('Revolver', 'title', 'recordsArr');
			assert.typeOf(result, 'object');
		});

		it('on fail search() sould return a string', function(){
			var result =  search('fail', 'fail', 'fail');
			assert.typeOf(result, 'string');
		});
	});

	describe('add', function(){

		it('on match add() should return false', function(){
			var result = add('Revolver', 'title', 'recordsArr');
			assert.equal(result, false);
		});

		it('on unmatch add() sould return true', function(){
			var result =  add('fail', 'fail', 'fail');
			assert.equal(result, true);
		});
	});

	describe('delete', function(){

		it('on success delete() should return true', function(){
			var result = del('Revolver', 'title', 'recordsArr');
			assert.equal(result, true);
		});

		it('on fail delete() sould return false', function(){
			var result =  del('fail', 'fail', 'fail');
			assert.equal(result, false);
		});
	});

});

