var recordsArr = [
	{title:'Revolver', artist:'The Beatles', year:'1966', length:'34:43', genre:'rock'},
	{title:'Marquee Moon', artist:'Television', year:'1977', length:'45:54', genre:'psych'},
	{title:'Watermark', artist:'Enya', year:'1988', length:'39:42', genre:'new age'}
];

exports.getAll = function() {
	return recordsArr;
};

exports.search = function(nameKey, prop, myArray) {

	myArray = recordsArr; // not sure why this wasnt working (find out how to not need hard coding)

	for (var i=0; i < myArray.length; i++) {
        if (myArray[i][prop] == nameKey) {
            return myArray[i];
	 	};
	};
};

exports.delete = function(nameKey, prop, myArray){
	myArray = recordsArr;
	for (var i=0; i < myArray.length; i++) {
		if (myArray[i][prop] == nameKey){
			var deletedItem = myArray[i]['title'];
			exports.deletedItem = deletedItem + ' has been deleted from database.';
			myArray.splice(i, 1);
			exports.lengthVar = myArray.length;
			return;
		} else { 
			exports.deletedItem = 'no item deleted.';
			exports.lengthVar = myArray.length;
		};
	};
};