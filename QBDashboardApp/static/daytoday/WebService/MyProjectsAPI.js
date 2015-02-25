
function MyProjectsAPI() {
	this.requestUrl = baseURL + "projectsummary/";
	this.requestType = "GET";
	this.requestParameters = "";
};

MyProjectsAPI.prototype.startWebService = function(){
	this.webServiceObj = new WebService(this.requestType, this.requestUrl ,"");
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
	
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
MyProjectsAPI.prototype.fetchCompleted = function(jsonRespose) {
	var jsonData = JSON.parse(jsonRespose);
	var MyProjectsModelArray = new Array();
    for( var i in jsonData.projects ) {
        MyProjectsModelArray.push(new MyProjectsModel(jsonData.projects[i]));
    }
    this.delegate.didReceiveMyProjects.call(this.delegate, MyProjectsModelArray);
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
MyProjectsAPI.prototype.fetchFailed = function() {
	this.delegate.didFailMyProjectsFetch.call(this.delegate);
	console.log("webservice error on MyProjectsAPI");
};
