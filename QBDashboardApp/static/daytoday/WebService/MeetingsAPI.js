
function MeetingsAPI() {
	this.requestUrl = baseURL + "meetingsummary/";
	this.requestType = "GET";
	this.requestParameters = "";
};

MeetingsAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
MeetingsAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var MeetingsModelArray = new Array();
    for( var i in jsonData.data.meetings ) {
    	MeetingsModelArray.push(new MeetingsModel(jsonData.data.meetings[i]));
    }
    this.delegate.didReceiveMeetings.call(this.delegate, MeetingsModelArray);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
MeetingsAPI.prototype.fetchFailed = function() {
	this.delegate.didFailMeetingsFetch.call(this.delegate);
	console.log("webservice error on MeetingsAPI");
};
