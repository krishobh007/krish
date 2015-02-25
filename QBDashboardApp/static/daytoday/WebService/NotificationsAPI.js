
function NotificationsAPI() {
	this.requestUrl = baseURL + "notifications/";
	this.requestType = "GET";
	this.requestParameters = "";
	};

NotificationsAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl , "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

NotificationsAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var NotificationsModelArray = new Array();
    for( var i in jsonData ) {
        NotificationsModelArray.push(new NotificationsModel(jsonData));
    }
    this.delegate.didReceiveNotifications.call(this.delegate, NotificationsModelArray);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
NotificationsAPI.prototype.fetchFailed = function() {
	this.delegate.didFailNotifications.call(this.delegate);
	console.log("webservice error on NotificationsAPI");
};
