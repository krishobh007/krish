function TodoOverviewModel(responseData) {
	this.todaySummaryModelArray = new Array();
		for( var i in responseData.todays_task) {
			this.todaySummaryModelArray.push(new TodoSummaryModel(responseData.todays_task[i]));
		}
	this.tomorrowSummaryModelArray = new Array();
		for( var i in responseData.tomarrows_task ) {
			this.tomorrowSummaryModelArray.push(new TodoSummaryModel(responseData.tomarrows_task[i]));
		}
	
	this.pendingTodoSummaryModelArray = new Array();
		for( var i in responseData.pending_task ) {
			this.pendingTodoSummaryModelArray.push(new TodoSummaryModel(responseData.pending_task[i]));
		}
	this.weekSummaryModelArray = new Array();
		for( var i in responseData.week_task ) {
			this.weekSummaryModelArray.push(new TodoSummaryModel(responseData.week_task[i]));
	    }
	this.heading = responseData.week_heading;  
	
}

