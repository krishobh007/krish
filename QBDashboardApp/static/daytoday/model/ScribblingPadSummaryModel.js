function ScribblingPadSummaryModel(responseData) {
	this.date = responseData.date.slice(0,10);
	this.data = responseData.data;
	this.id = responseData.id;
}