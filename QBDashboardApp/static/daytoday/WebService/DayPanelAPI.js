function DayPanelAPI() {
	this.requestUrl = baseURL + "taskoverview/";
	this.requestType = "GET";
	this.requestParameters = "";
};

DayPanelAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl , "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

DayPanelAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var DayPanelModelArray = new Array();
    for( var i in jsonData.data.task_details ) {
        DayPanelModelArray.push(new DayPanelModel(jsonData.data.task_details[i]));
    }
    this.delegate.didReceiveDayPanel.call(this.delegate, DayPanelModelArray);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
DayPanelAPI.prototype.fetchFailed = function() {
	this.delegate.didFailDayPanelFetch.call(this.delegate);
	console.log("webservice error on DayPanelAPI");
};
