
function HeaderAPI() {
	this.requestUrl = baseURL + "profile/";
	this.requestType = "GET";
	this.requestParameters = "";
};

HeaderAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
HeaderAPI.prototype.fetchCompleted = function(jsonRespose) {
		var jsonData = JSON.parse(jsonRespose);
		var headerModel = new HeaderModel(jsonData.data);
		this.delegate.didReceiveHeader.call(this.delegate, headerModel);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
HeaderAPI.prototype.fetchFailed = function() {
	this.delegate.didFailHeaderFetch.call(this.delegate);
	console.log("webservice error on HeaderAPI");
};
