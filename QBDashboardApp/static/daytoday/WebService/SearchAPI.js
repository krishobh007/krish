function SearchAPI() {
	
};

SearchAPI.prototype.startWebService = function(data){
	this.requestUrl = baseURL + "search?q="+data;
	this.requestType = "POST";
	this.requestParameters = "";
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, this.requestParameters);
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

SearchAPI.prototype.fetchCompleted = function(jsonRespose) {
	
	jsonRespose = JSON.parse(jsonRespose);
	console.log(jsonRespose);
	if(jsonRespose.status == true){
		console.log("fetchCompleted SearchAPI");
		this.delegate.didReceiveSearch.call(this.delegate,jsonRespose.data);
	}
	else{
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

SearchAPI.prototype.fetchFailed = function() {
	console.log("webservice error on SearchAPI");
};
