function UpdateTodoAPI() {
	
};

UpdateTodoAPI.prototype.startWebService = function(){
	
	this.requestUrl = baseURL + "updatetask/";
	this.requestType = "POST";
	this.requestParameters = JSON.stringify(this.getParameterJson());
	console.log(this.requestParameters);
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, this.requestParameters);
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

UpdateTodoAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.status == true){
		console.log("fetchCompleted");
		this.delegate.didReceiveUpdateTodo.call(this.delegate,jsonRespose.data);
	}
	else{
		console.log("fetch failed UpdateTodoAPI");
		$('#todoInfoBlock .alert-info').hide();
		$('#todoInfoBlock .alert-error').show().html("Error on upadate todo"+"\n"+jsonRespose.errorMessages);
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

UpdateTodoAPI.prototype.fetchFailed = function() {
	console.log("error");
	this.delegate.didFailFetch.call(this.delegate);
};

UpdateTodoAPI.prototype.getParameterJson = function() {

	var paramJson = {};
	paramJson.tasks = app.todoModel.get('task');
	paramJson.task_status = app.todoModel.get('status');
	paramJson.date = app.todoModel.get('date');
	paramJson.time = app.todoModel.get('time');
	paramJson.priority = app.todoModel.get('priority');
	paramJson.category = app.todoModel.get('category');
	paramJson.project = app.todoModel.get('project');
	paramJson.id = app.todoModel.get('id');
	return paramJson;
		
};