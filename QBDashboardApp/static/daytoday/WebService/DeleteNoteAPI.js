function DeleteNoteAPI(id) {
	this.requestUrl = baseURL + "deletemyscriblings/";
	this.requestType = "GET";
	this.requestParameters = id;
};

DeleteNoteAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl+"?id="+this.requestParameters,"");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

DeleteNoteAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.status==true){
		console.log("fetchCompleted DeleteNoteAPI");
		this.delegate.didReceiveDeleteNote.call(this.delegate,this.requestParameters);
	}
	else{
		console.log("fetch failed DeleteNoteAPI");
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
		this.delegate.didFailedDeleteNote.call(this.delegate);
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/

DeleteNoteAPI.prototype.fetchFailed = function() {
	this.delegate.didFailFetchDelete.call(this.delegate);
};

