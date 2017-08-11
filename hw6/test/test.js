const 	assert = require('chai').assert;

const	getAll = require('../lib/records').getAll,
		search = require('../lib/records').search,
		del = require('../lib/records').delete,
		add = require('../lib/records').add;

describe('App', function(){
	describe('search', function(){

		it('on success search() should return an object', function(){
			var result = search('Revolver');
			assert.typeOf(result, 'object');

		});

		it('on fail search() sould return undefined', function(){
			var result =  search('fail1');
			assert.equal(result, undefined);
		});
	});

	describe('add', function(){

		it('on match add() should return false', function(){
			var result = add('Revolver').added;
			assert.equal(result, false);
		});

		it('on no match add() sould return true', function(){
			var result =  add('fail2').added;
			assert.equal(result, true);
		});
	});

	describe('delete', function(){

		it('on match delete() should return true', function(){
			var result = del('Revolver').deleted;
			assert.equal(result, true);
		});

		it('on no match delete() sould return false', function(){
			var result =  del('fail3').deleted;
			assert.equal(result, false);
		});
	});

});

