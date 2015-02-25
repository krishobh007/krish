var renderNoTodos = function(selector,message){
		var template = _.template(tpl.get('noTodo'), this.params);
		$(selector).append(template);
		$(selector+" #noTodoMsg").html(message);
};

var renderPendingTodos = function(that){
		//pending tasks
		$("#todoPending").html("");
		if(currentPage == "MyDashboard"){
			for( var i= app.pendingTodoCount;i >0 ;i++) {	
				that.appendTodoSummaryData(app.jsonData.pendingTodoSummaryModelArray[i].id);
			}
			if(app.pendingTodoCount > 10){
				for( var i=0;i<app.pendingTodoCount-10 ;i++) {	
					$("#todoPending span#"+app.jsonData.pendingTodoSummaryModelArray[i].id).addClass("hide");
				}
			}
		}
		else if(currentPage == "MyTodo"){
			for( var i in app.jsonData.pendingTodoSummaryModelArray ) {
				that.appendTodoSummaryData(app.jsonData.pendingTodoSummaryModelArray[i].id);
			}
		}
		that.hideButton();
};
var renderTodaysTodos= function(that){
		//todays
		$("#todoToday").html("");
		if(currentPage == "MyDashboard"){
			for( var i=0; i<app.todoCount[2] ;i++) {	
				that.appendTodoSummaryData(app.jsonData.todaySummaryModelArray[i].id);
			}
			if(app.todoCount[2] > 10){
				for( var i=0;i<app.todoCount[2]-10 ;i++) {	
					$("#todoToday span#"+app.jsonData.todaySummaryModelArray[i].id).addClass("hide");
				}
			}
		}
		else if(currentPage == "MyTodo"){
			for( var i in app.jsonData.todaySummaryModelArray ) {
				that.appendTodoSummaryData(app.jsonData.todaySummaryModelArray[i].id);
			}
		}
		that.hideButton();
};
var renderTomorrowsTodos = function(that){
		//tomorrows
		$("#todoTomorrow").html("");
		
		if(currentPage == "MyDashboard"){
			for( var i=0; i<app.todoCount[3] ;i++) {	
				that.appendTodoSummaryData(app.jsonData.tomorrowSummaryModelArray[i].id);
			}
			if(app.todoCount[3] > 5){
				for( var i=0;i<app.todoCount[3]-5 ;i++) {	
					$("#todoTomorrow span#"+app.jsonData.tomorrowSummaryModelArray[i].id).addClass("hide");
				}
			}
			/*if(app.todoCount[3] < 5){
				for( var i=0; i<5 && i<app.todoCount[3] ;i++) {	
					that.appendTodoSummaryData(app.jsonData.tomorrowSummaryModelArray[i].id);
				}
			}
			else{
				for( var i=app.todoCount[3]-5; i<app.todoCount[3] ;i++) {	
					that.appendTodoSummaryData(app.jsonData.tomorrowSummaryModelArray[i].id);
				}
			}*/
		}
		else if(currentPage == "MyTodo"){
			for( var i in app.jsonData.tomorrowSummaryModelArray ) {
				that.appendTodoSummaryData(app.jsonData.tomorrowSummaryModelArray[i].id);
			}
		}
		that.hideButton();
};
var renderWeekTodos = function(that){
		//week tasks
		$("#todoThisWeek").html("");
		
		if(currentPage == "MyDashboard"){
			for( var i=0; i<app.weekTodoCount ;i++) {	
				that.appendTodoSummaryData(app.jsonData.weekSummaryModelArray[i].id);
			}
			if(app.weekTodoCount > 5){
				for( var i=0;i<app.weekTodoCount-5 ;i++) {	
					$("#todoThisWeek span#"+app.jsonData.weekSummaryModelArray[i].id).addClass("hide");
				}
			}
			
			
			
//			
//			if(app.weekTodoCount < 5){
//				for( var i=0; i<5 && i<app.weekTodoCount ;i++) {	
//					that.appendTodoSummaryData(app.jsonData.weekSummaryModelArray[i].id);
//				}
//			}
//			else{
//				for( var i=app.weekTodoCount-5; i<app.weekTodoCount ;i++) {	
//					that.appendTodoSummaryData(app.jsonData.weekSummaryModelArray[i].id);
//				}
//			}
		}
		else if(currentPage == "MyTodo"){
			for( var i in app.jsonData.weekSummaryModelArray) {
				that.appendTodoSummaryData(app.jsonData.weekSummaryModelArray[i].id);
			}
		}
		that.hideButton();
};
