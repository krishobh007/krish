var todoSummaryViewCompleted = function(taskId,that){
		console.log("didReceiveTaskCompleted");
		 //update if belongs to pending
		 for( var i in app.jsonData.pendingTodoSummaryModelArray ) {
			 if(taskId == app.jsonData.pendingTodoSummaryModelArray[i].id){
				 app.jsonData.pendingTodoSummaryModelArray[i].status = false;
				 $("span#"+taskId+" span#boxType" ).addClass("completed");
			 }
		 }
		 //update if belongs to today
		 for( var i in app.jsonData.todaySummaryModelArray ) {
			 if(taskId == app.jsonData.todaySummaryModelArray[i].id){
				 app.jsonData.todaySummaryModelArray[i].status = false;
				 $("span#"+taskId+" span#boxType").addClass("completed");
			 }
		 }
		//update if belongs to tomarrow
		 for( var i in app.jsonData.tomorrowSummaryModelArray) {
			 if(taskId == app.jsonData.tomorrowSummaryModelArray[i].id){
				 app.jsonData.tomorrowSummaryModelArray[i].status = false;
				 $("span#"+taskId+" span#boxType").addClass("completed");
			 }
		 }
		//update if belongs to week tasks
		 for( var i in app.jsonData.weekSummaryModelArray) {
			 if(taskId == app.jsonData.weekSummaryModelArray[i].id){
				 app.jsonData.weekSummaryModelArray[i].status = false;
				 $("span#"+taskId+" span#boxType").addClass("completed");
			 }
		 }
		 showButton(("span#"+taskId+" span#boxType"));
};