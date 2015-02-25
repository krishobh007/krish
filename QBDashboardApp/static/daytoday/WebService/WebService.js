
/*** The constructor ***/
function WebService(requestType,requestUrl,requestParameters) {
	this.requestType = requestType;
	this.requestUrl = requestUrl;
	this.requestParameters = requestParameters;
}

WebService.prototype.performRequest = function() {
	var xmlhttp;
	var that = this;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open(this.requestType, this.requestUrl, true);
	xmlhttp.setRequestHeader("Accept","text/plain");
	xmlhttp.setRequestHeader("Content-type","text/plain");

	xmlhttp.onreadystatechange=function() {
		//console.log("ready state changed");
		if (xmlhttp.readyState==4) {
			if (xmlhttp.status == 200) {
				this.webServiceData = xmlhttp.responseText;
				that.delegate.fetchCompleted.call(that.delegate, xmlhttp.responseText);
			}
			else {
				console.log("status != 200, status = " + xmlhttp.status);
				that.delegate.fetchFailed.call(that.delegate);
			}
		}
	}; 		
	xmlhttp.send(this.requestParameters);
	xmlhttp.ontimeout = function(){
		that.delegate.fetchFailed.call(that.delegate);
	};
};
