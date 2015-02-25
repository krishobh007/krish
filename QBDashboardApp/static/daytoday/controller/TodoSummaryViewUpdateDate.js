var todoSummaryViewUpdateDate = function(data,that){
		 console.log("todoSummaryViewUpdateDate");
		 console.log(data);
		 app.todoSummaryModel = new TodoSummaryModel(data);
		 todoSummaryViewDelete(data.taskid,that);
		 $("#"+data.id).remove();
		 if(data.date == DAY_ARRAY[2]){
			 console.log("TODAY DATE");
			 app.jsonData.todaySummaryModelArray.push(app.todoSummaryModel);
			 that.appendTodoSummaryData(that.todoId,data.date);
		 }
		 else if(data.date == DAY_ARRAY[3]){
			 console.log("TOMORROW DATE");
			 app.jsonData.tomorrowSummaryModelArray.push(app.todoSummaryModel);
			 that.appendTodoSummaryData(that.todoId,data.date);
		 }
		 else if(data.date == DAY_ARRAY[4]){
			 app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
			 that.appendTodoSummaryData(that.todoId,data.date);
		 }
		 else if(data.date > DAY_ARRAY[4]){
			 app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
			 that.appendTodoSummaryData(that.todoId,data.date);
		 }
		 else if(data.date < DAY_ARRAY[2]){
				app.jsonData.pendingTodoSummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
		 }
};			