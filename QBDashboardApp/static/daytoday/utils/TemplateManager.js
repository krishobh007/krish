
var renderTempate = function(templateFileName, paramters){
	var request = new XMLHttpRequest();
	request.open('GET', 'templates/html/' + templateFileName + '.html', false);
	request.send(null);
	if (request.status === 200) {
		var compiled = _.template(request.responseText);
		return compiled(paramters);
	}
	//TODO: Handle failure cases
};
