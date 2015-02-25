
function ScribblingPadAPI() {
	this.requestUrl = baseURL + "createscriblingdata/";
	this.requestType = "POST";
	this.requestParameters = "";
};

ScribblingPadAPI.prototype.startWebService = function(){
	this.requestParameters = JSON.stringify(this.getParameterJson());
	console.log(this.requestParameters);
	this.webServiceObj = new WebService(this.requestType, this.requestUrl ,this.requestParameters);
	this.webServiceObj.delegate = this;
	this.webServiceObj.performRequest();
};

/*** Delegate. Invoked when webserviceObj, fetch Completed event is triggered. ***/
ScribblingPadAPI.prototype.fetchCompleted = function(jsonRespose) {
	jsonRespose=JSON.parse(jsonRespose);
	if(jsonRespose.Success == true){
		$('#scriblingPadInfoBlock .alert-info').hide();
		$('#scriblingPadInfoBlock .alert-success').show().html(NOTE_SUCCESS_TEXT);
		this.delegate.didReceiveNotes.call(this.delegate,jsonRespose.data);
		setTimeout(function(){$('#scriblingPadInfoBlock .alert').fadeOut('slow');},1000);
	}
	else{
		$('#scriblingPadInfoBlock .alert-info').hide();
		$("#activityIndicatorNoteError").modal("show");
		$('#scriblingPadInfoBlock .alert-error').show().html(NOTE_ERROR_TEXT);
		if(jsonRespose.errorMessages == SESSION_EXPIRED ){
			sessionExpired();
		}
	}
};

/*** Delegate. Invoked when webserviceObj, fetch Failed event is triggered. ***/
ScribblingPadAPI.prototype.fetchFailed = function() {
	console.log("webservice error on ScribblingPadAPI");
};

ScribblingPadAPI.prototype.getParameterJson = function() {
	var paramJson = {};
	paramJson.task = app.scribblingPadModel.get('task');
	return paramJson;
};
