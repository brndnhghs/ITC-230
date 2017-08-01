var recordsArr = [
	{title:'Revolver', artist:'The Beatles', year:'1966', length:'34:43', genre:'rock'},
	{title:'Marquee Moon', artist:'Television', year:'1977', length:'45:54', genre:'psych'},
	{title:'Watermark', artist:'Enya', year:'1988', length:'39:42', genre:'new age'}
];

exports.getAll = function() {
	return recordsArr;
};

exports.search = function(val, key, myArray) {

	myArray = recordsArr;

	for (var i=0; i < myArray.length; i++) {
        if (myArray[i][key] == val) {
            return myArray[i];
	 	};
	};
	
	return 'could not find ' + val;
};

exports.delete = function(val, key, myArray){
	myArray = recordsArr;
	for (var i=0; i < myArray.length; i++) {
		if (myArray[i][key] == val){
			var deletedItem = myArray[i]['title'];
			exports.deletedItem = deletedItem + ' has been deleted from database.';
			myArray.splice(i, 1);
			exports.lengthVar = myArray.length;
			return true;
		};
	};

	exports.deletedItem = 'no item deleted.';
	exports.lengthVar = myArray.length;
	return false;
};

exports.add = function(val, key, myArray){
	myArray = recordsArr;
	var addedObject = {title: val, artist: 'lorem', year:'9999', length:'99:99', genre:'noise'};

	for (var i=0; i < myArray.length; i++) {
		if (myArray[i][key] == val){
			exports.addmsg = 'item already in database.';
			exports.lengthVar = myArray.length;
			return false;
		};
	};

	exports.addmsg = val + ' has been added to database.';
	myArray.push(addedObject);
	exports.lengthVar = myArray.length;
	return true;
};