var todoSummaryViewDelete = function(todoId,that){
		 console.log("TodoSummaryViewDelete");
		 
		 //delete if belongs to pending
		 for( var i in app.jsonData.pendingTodoSummaryModelArray ) {
			 if(todoId == app.jsonData.pendingTodoSummaryModelArray[i].id){
				
				if(app.jsonData.pendingTodoSummaryModelArray[i].date == DAY_ARRAY[0]){
					app.todoCount[0]--;
				 	$('#dayOneTodos').html("");
				 	$('#dayOneTodos').prepend(app.todoCount[0]);
				}
				else if(app.jsonData.pendingTodoSummaryModelArray[i].date == DAY_ARRAY[1]){
					 app.todoCount[1]--;
					 $('#dayTwoTodos').html("");
					 $('#dayTwoTodos').prepend(app.todoCount[1]);
				}
				app.pendingTodoCount --;
				if(app.pendingTodoCount == 0){
					renderNoTodos("#todoPending","There is no pending todos");
					console.log("No pending todo");
				}
				$("#todoPendingCount").html(app.pendingTodoCount);
				if(app.pendingTodoCount > 10)
						$("#todoPendingCount2").html("10 of "+app.pendingTodoCount);
				else 	$(".viewMorePending").hide();
					
				delete app.jsonData.pendingTodoSummaryModelArray[i];
			 }
		 }
		 //delete if belongs to today
		 for( var i in app.jsonData.todaySummaryModelArray ) {
			 if(todoId == app.jsonData.todaySummaryModelArray[i].id){
				 console.log("found data"+todoId);
				 delete app.jsonData.todaySummaryModelArray[i];
				 app.todoCount[2]--;
				 $('#dayThreeTodos').html("");
				 $('#dayThreeTodos').prepend(app.todoCount[2]);
				 
				 $("#todoTodayCount").html(app.todoCount[2]);
				 if(app.todoCount[2] > 10)
						$("#todoTodayCount2").html("10 of "+app.todoCount[2]);
				 else	$(".viewMoreToday").hide();
						
				 if(app.todoCount[2] ==0){
						renderNoTodos("#todoToday","There is no todo Today");
						console.log("No todo Today");
				 }
			 }
		 }
		 
		//delete if belongs to tomorrow
		 for( var i in app.jsonData.tomorrowSummaryModelArray) {
			 if(todoId == app.jsonData.tomorrowSummaryModelArray[i].id){
				 delete app.jsonData.tomorrowSummaryModelArray[i];
				 app.todoCount[3]--;
				 $('#dayFourTodos').html("");
				 $('#dayFourTodos').prepend(app.todoCount[3]);
				 
				 $("#todoTomorrowCount").html(app.todoCount[3]);
				 if(app.todoCount[3] > 5)
						$("#todoTomorrowCount2").html("5 of "+app.todoCount[3]);
				 else	$(".viewMoreTomorrow").hide();
				 
				 if(app.todoCount[3] ==0){
						renderNoTodos("#todoTomorrow","There is no todo Tomorrow");
						console.log("No todo Tomorrow");
				 }
			 }
		 }
		//delete if belongs to week tasks
		 for( var i in app.jsonData.weekSummaryModelArray) {
			 if(todoId == app.jsonData.weekSummaryModelArray[i].id){
				 if(app.jsonData.weekSummaryModelArray[i].date == DAY_ARRAY[4]){
					app.todoCount[4]--;
				 	$('#dayFiveTodos').html("");
				 	$('#dayFiveTodos').prepend(app.todoCount[0]);
				 }
				 app.weekTodoCount --;
				 $("#todoWeekCount").html(app.weekTodoCount);
				 if(app.weekTodoCount > 5)
						$("#todoWeekCount2").html("5 of "+app.weekTodoCount);
				 else   $(".viewMoreWeek").hide();
				 
				 delete app.jsonData.weekSummaryModelArray[i];
				 if(app.weekTodoCount == 0){
					 	renderNoTodos("#todoThisWeek","There is no todo "+app.weekHeading);
				 }
			 }
		 }
};