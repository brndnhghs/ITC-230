var records = [
	{title:'Revolver', artist:'The Beatles', year:'1966', length:'34:43', genre:'rock'},
	{title:'Marquee Moon', artist:'Television', year:'1977', length:'45:54', genre:'psych'},
	{title:'Watermark', artist:'Enya', year:'1988', length:'39:42', genre:'new age'}
];

exports.getAll = function() {
	return records;
};

exports.get = function(title) {
	return records.find(function(record) {
		return record.title === title;
	});
};

exports.delete = function(title) {
    let newRecords = records.filter(function(album) {
        return album.title !== title; 
    });
   
    records = newRecords;
};