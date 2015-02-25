function TaskCompletedAPI(id) {
	this.requestUrl = baseURL + "completetask/";
	this.requestType = "GET";
	this.requestParameters = id;
};

TaskCompletedAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl+"?id="+this.requestParameters,"");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

TaskCompletedAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.data.Success==true){
		console.log("fetchCompleted");
		this.delegate.didReceiveTaskCompleted.call(this.delegate,this.requestParameters);
	}
	else{
		console.log("fetch failed TaskCompletedAPI");
		$('#todoInfoBlock .alert-info').hide();
		$('#todoInfoBlock .alert-error').show().html("Error on task completed"+"\n"+jsonRespose.errorMessages);
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

TaskCompletedAPI.prototype.fetchFailed = function() {
	console.log("error");
	this.delegate.didFailFetch.call(this.delegate);
};

