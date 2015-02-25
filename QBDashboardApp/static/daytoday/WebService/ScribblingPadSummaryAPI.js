function ScribblingPadSummaryAPI() {
	this.requestUrl = baseURL + "getmyscriblings/";
	this.requestType = "GET";
	this.requestParameters = "";
};

ScribblingPadSummaryAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl , "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
ScribblingPadSummaryAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	if(jsonData.status == true){
		for( var i in jsonData.data ) {
			app.scribblingPadSummaryModelArray.push(new ScribblingPadSummaryModel(jsonData.data[i]));
	    }
		this.delegate.didReceiveScribblingPadSummary.call(this.delegate, app.scribblingPadSummaryModelArray);
	}
	else{
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
ScribblingPadSummaryAPI.prototype.fetchFailed = function() {
	this.delegate.didFailScribblingPadSummaryFetch.call(this.delegate);
	console.log("webservice error on ScribblingPadSummaryAPI");
};

