function UpdateDateTodoAPI() {
	this.requestUrl = baseURL + "updatetaskdate/";
	this.requestType = "POST";
	this.requestParameters = "";
};

UpdateDateTodoAPI.prototype.startWebService = function(){
	this.requestParameters = JSON.stringify(this.getParameterJson());
	this.webServiceObj = new WebService(this.requestType, this.requestUrl,this.requestParameters);
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

UpdateDateTodoAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.status==true){
		console.log("fetchCompleted");
		this.delegate.didReceiveUpdateDateTodo.call(this.delegate,jsonRespose.data);
	}
	else{
		console.log("fetch failed UpdateTodoAPI");
		$('#todoInfoBlock .alert-info').hide();
		$('#todoInfoBlock .alert-error').show().html("Error on upadate date todo"+"\n"+jsonRespose.errorMessages);
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

UpdateDateTodoAPI.prototype.fetchFailed = function() {
	this.delegate.didFailFetch.call(this.delegate);
};

UpdateDateTodoAPI.prototype.getParameterJson = function() {

	var paramJson = {};
	paramJson.date = app.todoModel.get('date');
	paramJson.time = app.todoModel.get('time');
	paramJson.id = app.todoModel.get('id');
	return paramJson;
		
};
