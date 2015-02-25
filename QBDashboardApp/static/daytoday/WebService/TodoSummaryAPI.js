
function TodoSummaryAPI() {
	this.requestUrl = baseURL + "upcomingtasks/";
	this.requestType = "GET";
	this.requestParameters = "";
};

TodoSummaryAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl , "");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
TodoSummaryAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var TodoOverview = new TodoOverviewModel(jsonData.data);
	for(var i in jsonData.data.categories)
		app.categoryModelArray.push(new CategoryModel(jsonData.data.categories[i]));
	for(var i in jsonData.data.projects)
		app.projectModelArray.push(new MyProjectsModel(jsonData.data.projects[i]));
	this.delegate.didReceiveTodoSummary.call(this.delegate, TodoOverview);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
TodoSummaryAPI.prototype.fetchFailed = function() {
	this.delegate.didFailTodoSummaryFetch.call(this.delegate);
	console.log("webservice error on TodoSummaryAPI");
};

