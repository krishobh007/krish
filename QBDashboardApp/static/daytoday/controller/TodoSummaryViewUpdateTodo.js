var todoSummaryViewUpdateTodo = function(data,that){			
			console.log("todoSummaryViewUpdateTodo");
			console.log(data);
		 	app.todoSummaryModel = new TodoSummaryModel(data);
		 	 $("#"+data.id).remove();
		 	console.log(app.todoSummaryModel);
		 	
		 	if(data.date == DAY_ARRAY[0] ){
				app.jsonData.pendingTodoSummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
			}
		 	else if(data.date == DAY_ARRAY[1] ){
				app.jsonData.pendingTodoSummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
			}
		 	else if(data.date == DAY_ARRAY[2] ){
				app.jsonData.todaySummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
			}
		 	else if(data.date == DAY_ARRAY[3] ){
				app.jsonData.tomorrowSummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
			}
			else if(data.date == DAY_ARRAY[4] ){
				app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
				that.appendTodoSummaryData(that.todoId,data.date);
			}
			else {
				if(data.date < DAY_ARRAY[0]){
					app.jsonData.pendingTodoSummaryModelArray.push(app.todoSummaryModel);
					that.appendTodoSummaryData(that.todoId,data.date);
				}
				else if(data.date > DAY_ARRAY[4]){
					app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
					that.appendTodoSummaryData(that.todoId,data.date);
				}
			}
};