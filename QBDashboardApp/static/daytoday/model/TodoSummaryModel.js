function TodoSummaryModel(responseData) {
	this.priority = responseData.priority;
	this.task = responseData.task;
	this.date = responseData.date;
	this.category = responseData.category;
	this.project = responseData.project;
	this.time = responseData.time;
	this.status = responseData.task_status;
	this.id = responseData.taskid;
}
