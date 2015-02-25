
function DayPanelModel(responseData) {
	this.date = responseData.date;
	this.day = responseData.week;
	this.tasks = responseData.tasks;
	this.todo = responseData.todo;
}