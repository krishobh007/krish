function DeleteTodoAPI(id) {
	this.requestUrl = baseURL + "deletetask/";
	this.requestType = "GET";
	this.requestParameters = id;
};

DeleteTodoAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl+"?id="+this.requestParameters,"");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

DeleteTodoAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.data.Success==true){
		console.log("fetchCompleted DeleteTodoAPI");
		this.delegate.didReceiveDeleteTodo.call(this.delegate,this.requestParameters);
	}
	else{
		console.log("fetch failed DeleteTodoAPI");
		$('#todoInfoBlock .alert-info').hide();
		$('#todoInfoBlock .alert-error').show().html("Error on delete todo"+"\n"+jsonRespose.errorMessages);
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
		this.delegate.didFailedDeleteTodo.call(this.delegate);
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

DeleteTodoAPI.prototype.fetchFailed = function() {
	this.delegate.didFailFetchDelete.call(this.delegate);
};

