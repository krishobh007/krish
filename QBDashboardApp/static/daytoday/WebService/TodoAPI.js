function TodoAPI() {
	
};

TodoAPI.prototype.startWebService = function(){
	this.requestUrl = baseURL + "createtask/";
	this.requestType = "POST";
	this.requestParameters = JSON.stringify(this.getParameterJson());
	console.log(this.requestParameters);
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, this.requestParameters);
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

TodoAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose = JSON.parse(jsonRespose);
	console.log(jsonRespose);
	if(jsonRespose.Status == true){
		console.log("fetchCompleted TodoAPI");
		
		$('#todoInfoBlock .alert-info').hide();
		$('#todoInfoBlock .alert-success').show().html(TODO_SUCCESS_TEXT);
		
		this.delegate.didReceiveTodo.call(this.delegate,jsonRespose.data);
		
		setTimeout(function(){$('#todoInfoBlock .alert').fadeOut('slow');},1000);
		
	}
	else{
		$('#todoInfoBlock .alert-info').hide();
		$("#activityIndicatorTodoInfo").modal("hide");
		$("#activityIndicatorTodoError").modal("show");
		
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

TodoAPI.prototype.fetchFailed = function() {
	console.log("webservice error on TodoAPI");
};

TodoAPI.prototype.getParameterJson = function() {

	var paramJson = {};
	
	paramJson.task = app.todoModel.get('task');
	paramJson.date = app.todoModel.get('date');
	paramJson.time = app.todoModel.get('time');
	paramJson.priority = app.todoModel.get('priority');
	paramJson.category = app.todoModel.get('category');
	paramJson.project = app.todoModel.get('project');
	return paramJson;
		
};