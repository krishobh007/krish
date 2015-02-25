
function TaskAPI() {
	this.requestUrl = baseURL + "tasksummary/";
	this.requestType = "GET";
	this.requestParameters = "";
};

TaskAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl, "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/

TaskAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var TaskModelArray = new Array();
    for( var i in jsonData.data.tasks ) {
        TaskModelArray.push(new TaskModel(jsonData.data.tasks[i]));
    }
    this.delegate.didReceiveTask.call(this.delegate, TaskModelArray);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
TaskAPI.prototype.fetchFailed = function() {
	this.delegate.didFailTaskFetch.call(this.delegate);
	console.log("webservice error on TaskAPI");
};
