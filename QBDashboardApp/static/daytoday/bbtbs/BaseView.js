var BaseView = Backbone.View.extend({
	initialize: function(){
		console.log("base initialize");
		this.templateName = "default";
		this.params = {};
		return this;
	 },
	 renderHTML: function() {
		 var template = _.template(tpl.get(this.templateName), this.params);
		 return this;
	 },
	 getURL : function() {
		return this.templateName; 
	 },
	 appendHTML: function(){
		 var template = _.template(tpl.get(this.templateName), this.params);
		 $(this.el).append(template);
		 return this;
	 },
	 showMessage: function(caption,message){
		 $('#popupView #message').html(message);
		 $('#popupView #popupMessageCaption h4').html(caption);
		 $('#popupView #popupMessage').modal('show');
		 $('#popupView #popupMessage #ok').live("click", function(){
			 $('#popupView #popupMessage').modal('hide');
		 });
		 $('#popupView #popupMessage #cancel').hide();
	 },
	 confirmMessage: function(message,operation,that){
		 console.log("confirmMessage");
		 $('#popupViewOperation #message').html(message);
		 $('#popupViewOperation #popupMessage').modal('show');
		 $('#popupViewOperation #popupMessageCaption h4').html("Confirm the "+ operation+" operation");
		 $('#popupViewOperation #popupMessage #ok').live("click", function(){
			 $('#popupViewOperation #popupMessage').modal('hide');
			 that.selectedOperation(operation);
			 return false;
		 });
		 $('#popupViewOperation #popupMessage #cancel').live("click", function(){
			 console.log("opretaion cancelled"); 
			 $('#popupViewOperation #popupMessage #cancel').modal('hide');
		 });
	 },
	 appendTodoSummaryData:function(todoId,date){
		 
		 /*	Not updating todo counts in initialise of TodoSummaryView.
		  * date will be 'undefined' while call from TodoSummaryViewRender.js	
		  **/
		 
		 //pending task
		 for( var i in (app.jsonData.pendingTodoSummaryModelArray )){
			 if(app.jsonData.pendingTodoSummaryModelArray[i].id == todoId){
				this.selector = "#todoPending ";
				
				if(date != undefined) {
					if(date == DAY_ARRAY[0] ){
						app.todoCount[0]++;
						$('#dayOneTodos').html("");
						$('#dayOneTodos').prepend(app.todoCount[0]);
					}
					else if(date == DAY_ARRAY[1] ){
						app.todoCount[1]++;
						$('#dayTwoTodos').html("");
						$('#dayTwoTodos').prepend(app.todoCount[1]);
					}
					if(app.pendingTodoCount == 0){
						$(this.selector).html('');
					}
					app.pendingTodoCount ++;
				}
				$("#todoPendingCount").html(app.pendingTodoCount);
				if(app.pendingTodoCount > 10){
						$(".viewMorePending").show();
						$("#todoPendingCount2").html("10 of "+app.pendingTodoCount);
				}
				else 	$(".viewMorePending").hide();
				
				this.renderTodoAppend(app.jsonData.pendingTodoSummaryModelArray[i],todoId);
			 }
		 }
		 //today
		 for( var i in (app.jsonData.todaySummaryModelArray )){
			 if(app.jsonData.todaySummaryModelArray[i].id == todoId){
				 this.selector = "#todoToday ";
				 
				 if(date != undefined) {
					 if(app.todoCount[2] == 0){
							$(this.selector).html('');
					 }
					 app.todoCount[2]++;
					 $('#dayThreeTodos').html("");
					 $('#dayThreeTodos').prepend(app.todoCount[2]);
				 }
				 $("#todoTodayCount").html(app.todoCount[2]);
				 if(app.todoCount[2] > 10){
					 	$(".viewMoreToday").show();
						$("#todoTodayCount2").html("10 of "+app.todoCount[2]);
						
						/*
						if($("#todoToday").find('span.todo-list').hasClass('hide')){
							$("#todoToday span.hide:last ~ .todo-list").first().addClass("hide");
						}
						else $("#todoToday .todo-list").first().addClass('hide');
						*/
				 }
				 else	$(".viewMoreToday").hide();
				 
				 this.renderTodoAppend(app.jsonData.todaySummaryModelArray[i],todoId);
			 }
		 }
		 //tomorrow
		 for( var i in (app.jsonData.tomorrowSummaryModelArray )){
			 if(app.jsonData.tomorrowSummaryModelArray[i].id == todoId){
				 this.selector = "#todoTomorrow ";
				 
				 if(date != undefined) {
					 if(app.todoCount[3] == 0){
							$(this.selector).html('');
					 }
					 app.todoCount[3]++;
					 $('#dayFourTodos').html("");
					 $('#dayFourTodos').prepend(app.todoCount[3]);
				 }
				 $("#todoTomorrowCount").html(app.todoCount[3]);
				 if(app.todoCount[3] > 5){
					 	$(".viewMoreTomorrow").show();
						$("#todoTomorrowCount2").html("5 of "+app.todoCount[3]);
						/*
						if($("#todoTomorrow").find('span.todo-list').hasClass('hide')){
							$("#todoTomorrow span.hide:last ~ .todo-list").first().addClass("hide");
						}
						else $("#todoTomorrow .todo-list").first().addClass('hide');
						*/
						
				 }
				 else	$(".viewMoreTomorrow").hide();
				 
				 this.renderTodoAppend(app.jsonData.tomorrowSummaryModelArray[i],todoId);
			 }
		 }
		 //week task
		 for( var i in (app.jsonData.weekSummaryModelArray )){
			 if(app.jsonData.weekSummaryModelArray[i].id == todoId){
				 this.selector = "#todoThisWeek ";
				 
				 if(date != undefined) {
					 if(date == DAY_ARRAY[4]){
							app.todoCount[4]++;
							$('#dayFiveTodos').html("");
							$('#dayFiveTodos').prepend(app.todoCount[4]);
					 }
					 if(app.weekTodoCount == 0){
							$(this.selector).html('');
					 }
					 app.weekTodoCount ++;
				 }
				 $("#todoWeekCount").html(app.weekTodoCount);
				 if(app.weekTodoCount > 5){
					 	$(".viewMoreWeek").hide();
						$("#todoWeekCount2").html("5 of "+app.weekTodoCount);
				 }
				 else	$(".viewMoreWeek").hide();
				 
				 this.renderTodoAppend(app.jsonData.weekSummaryModelArray[i],todoId);
			 }
		 }
	 },
	 renderTodoAppend:function(data,id){
		 
		 	if(currentPage == "MyDashboard"){
		 		template = _.template(tpl.get('todoList'), this.params);
		 	}
		 	else if(currentPage == "MyTodo"){
		 			template = _.template(tpl.get('MyTodoPageList'), this.params);
		 	}
		 	else if(currentPage == "Search"){
		 			template = _.template(tpl.get('SearchResultList'), this.params);
		 			this.selector ="#todoSearch ";
		 	}
			$(this.selector).append(template);
		 	
			$(this.selector+' span.todo-list').last().attr("id",id);
			
			
			this.dispalyDate = getDisplayDate(data.date,data.time);
			
			var dateFormat = getDateFormat(data.date);
			var timeFormat = get12HrFormat(data.time);
			
			/* set box type	and Date/Time Format */
			if(this.selector =="#todoPending "){
				$(this.selector+"span.todo-list:last #boxType").addClass("arrow_box_pending");
				$(this.selector+'span #taskDate').last().append(dateFormat);
			}
			else if(this.selector =="#todoToday "){
				$(this.selector+"span.todo-list:last #boxType").addClass("arrow_box_today");
				$(this.selector+'span #taskDate').last().append(timeFormat);
			}
			else if(this.selector =="#todoTomorrow "){
				$(this.selector+"span.todo-list:last #boxType").addClass("arrow_box");
				$(this.selector+'span #taskDate').last().append(timeFormat);
			}
			else{
				$(this.selector+"span.todo-list:last #boxType").addClass("arrow_box");
				$(this.selector+'span #taskDate').last().append(dateFormat);
			}
			
			/* set priority bubble */
			if(this.selector =="#todoPending " || data.priority == 2) $(this.selector+"span.todo-list:last #setPriority").addClass("high-priority");
			else if(data.priority == 1) $(this.selector+"span.todo-list:last #setPriority").addClass("medium-priority");
			else $(this.selector+"span.todo-list:last #setPriority").addClass("low-priority");
			
			if(data.task.length > 60 && currentPage == "Search"){
				$(this.selector+'span #taskName').last().append(data.task.substring(0,60)+"..");
			}
			else if(data.task.length > 150){
				$(this.selector+'span #taskName').last().append(data.task.substring(0,150)+"..");
			}
			else{
				$(this.selector+' span #taskName').last().append(data.task);
			}
			
			if(data.category !="N/A"){
				if(data.category.length > 8)
					$(this.selector+' span #taskCategory').last().append(data.category.substring(0,8)+"..");
				else
					$(this.selector+' span #taskCategory').last().append(data.category.substring(0,8));
			}
			else{
				$(this.selector+' span .todo-category').hide();
				
			}
			$(this.selector+' span#taskDetails').hide();
			
			if(data.project !="N/A"){
				if(data.project.length > 8)
					$(this.selector+' span #taskProject').last().append(data.project.substring(0,8)+"..");
				else 
					$(this.selector+' span #taskProject').last().append(data.project.substring(0,8));
			}
			else{
				$(this.selector+' span .todo-project').hide();
			}
			
			if(currentPage == "Search"){
				$(this.selector+'span #taskDate').last().append(this.dispalyDate);
			}
			
			$(this.selector+"span #today").hide();
			
			if(data.status == false){
				$(this.selector+" span#boxType").last().addClass("completed");
				$(this.selector+" span#boxType").last().children().find("#taskName").css('text-decoration','line-through');
			}
			this.hideButton();
			
			if(currentPage == "Search"){
	 			$("#todoSearch span#todoButtons").hide();
			}
	},
	
	renderTodoAppend999:function(data,id){
		 
	 	if(currentPage == "MyDashboard"){
	 		template = _.template(tpl.get('todoList'), this.params);
	 	}
	 	else if(currentPage == "MyTodo"){
	 			template = _.template(tpl.get('MyTodoPageList'), this.params);
	 	}
	 	else if(currentPage == "Search"){
	 			template = _.template(tpl.get('SearchResultList'), this.params);
	 			this.selector ="#todoSearch ";
	 	}
		$(this.selector).prepend(template);
	 	
		$(this.selector+' span.todo-list').first().attr("id",id);
		
		
		this.dispalyDate = getDisplayDate(data.date,data.time);
		
		var dateFormat = getDateFormat(data.date);
		var timeFormat = get12HrFormat(data.time);
		
		/* set box type	and Date/Time Format */
		if(this.selector =="#todoPending "){
			$(this.selector+"span.todo-list:first #boxType").addClass("arrow_box_pending");
			$(this.selector+'span #taskDate').first().append(dateFormat);
		}
		else if(this.selector =="#todoToday "){
			$(this.selector+"span.todo-list:first #boxType").addClass("arrow_box_today");
			$(this.selector+'span #taskDate').first().append(timeFormat);
		}
		else if(this.selector =="#todoTomorrow "){
			$(this.selector+"span.todo-list:first #boxType").addClass("arrow_box");
			$(this.selector+'span #taskDate').first().append(timeFormat);
		}
		else{
			$(this.selector+"span.todo-list:first #boxType").addClass("arrow_box");
			$(this.selector+'span #taskDate').first().append(dateFormat);
		}
		
		/* set priority bubble */
		if(this.selector =="#todoPending " || data.priority == 2) $(this.selector+"span.todo-list:first #setPriority").addClass("high-priority");
		else if(data.priority == 1) $(this.selector+"span.todo-list:first #setPriority").addClass("medium-priority");
		else $(this.selector+"span.todo-list:first #setPriority").addClass("low-priority");
		
		if(data.task.length > 60 && currentPage == "Search"){
			$(this.selector+'span #taskName').first().append(data.task.substring(0,60)+"..");
		}
		else if(data.task.length > 150){
			$(this.selector+'span #taskName').first().append(data.task.substring(0,150)+"..");
		}
		else{
			$(this.selector+' span #taskName').first().append(data.task);
		}
		
		if(data.category !="N/A"){
			if(data.category.length > 8)
				$(this.selector+' span #taskCategory').first().append(data.category.substring(0,8)+"..");
			else
				$(this.selector+' span #taskCategory').first().append(data.category.substring(0,8));
		}
		else{
			$(this.selector+' span .todo-category').hide();
			
		}
		$(this.selector+' span#taskDetails').hide();
		
		if(data.project !="N/A"){
			if(data.project.length > 8)
				$(this.selector+' span #taskProject').first().append(data.project.substring(0,8)+"..");
			else 
				$(this.selector+' span #taskProject').first().append(data.project.substring(0,8));
		}
		else{
			$(this.selector+' span .todo-project').hide();
		}
		
		if(currentPage == "Search"){
			$(this.selector+'span #taskDate').first().append(this.dispalyDate);
		}
		
		$(this.selector+"span #today").hide();
		
		if(data.status == false){
			$(this.selector+" span#boxType").first().addClass("completed");
			$(this.selector+" span#boxType").first().children().find("#taskName").css('text-decoration','line-through');
		}
		this.hideButton();
		
		if(currentPage == "Search"){
 			$("#todoSearch span#todoButtons").hide();
		}
	},
	
	hideButton:function(){
		$("#todoSummary span #edit").hide();
		$("#todoSummary span #view").hide();
		$("#todoSummary span #today").hide();
		$("#todoSummary span #completed").hide();
		$("#todoSummary span #later").hide();
		$("#todoSummary span #delete").hide();
	 },
	 showButton:function(){
		//limit text size
		 
		text = $("#taskName").text();
		$(element).find('#edit').show();
		
		 $("#todoSummary span #view").show();
		 $(element).find('#delete').show();
		 if($(element).closest("ul").attr("id")!="todoPending" && $(element).closest("ul").attr("id")!="todoToday")
			$(element).find('#today').show();
		 if(!$(this.selector+" span#boxType").last().hasClass("completed")){
			$(element).find('#completed').show();
			 $(element).find('#later').show();
		}
	 },
	 renderScribblingPadSummary : function (jsonData){
		 	var template = _.template(tpl.get('ScribblingPadSummaryList'), this.params);
		 	$("#scribblingData").append(template);
		 	$("#scribblingData tr:last").attr("id",jsonData.id);
			$("td#scribblingNo:last").append(jsonData.id);
			$("td#scribblingDate:last").append(jsonData.date);
			$("td#scribblingNote:last").append(jsonData.data);
	 }
});
