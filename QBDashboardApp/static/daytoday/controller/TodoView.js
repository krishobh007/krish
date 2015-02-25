var TodoView = BaseView.extend({
	 initialize: function(){
		this.templateName = "todo";
		this.appendHTML();
		$("#advOptions").hide();
		$('#todoInfoBlock .alert').hide();
		$(function() {
		    $('#datetimepicker').datetimepicker({
		      language: 'en',
		      pick12HourFormat: true,
		      startDate: minDate,
		      endDate: maxDate
		    });
		});
		//help info for creating new todo.
		$(function (){
			$("#todoInput").popover({
				title: 'Todo Help',
				placement : 'left',
				content: TODO_HELP_TEXT,
				trigger:'hover',
				html:'true',
			});  
			
		}); 
		return this;
	 },
	 events: {
		 "keyup #createTodo" : "createTodoKeyPress",
		 "click #addTodoButton" : "createTodoClick",
		 "click #btnAdvacedOptions" : "AdvOptionsClick",
		 "click #advOptionsClose": "AdvOptionsClose"
	 },
	 createTodoClick:function(e){
		 this.EnterkeyPress();
	 },
	 createTodoKeyPress:function(e){
		 if (e.keyCode === 13) {
			 this.EnterkeyPress();
		 }
	 },
	 EnterkeyPress:function(e){

		 		$('#todoInput').popover("hide");
		 		
				this.data = $("#todoInput").val();
				var datetime = $("#inputDate").val();
				this.category = $("#inputCategory").val();
				this.project = $("#inputProject").val();
				this.priority = $("#TodoPriorityList").val();
				
				if(this.validate()){
					
					$("#todoInput").val("");
					$("#inputCategory").val("");
					$("#inputProject").val("");
					$("#inputDate").val("");
					
					$('#todoInfoBlock .alert-info').show().html(TODO_LOADING_MSG);
					
					if((datetime != "")){
						this.date = datetime.slice(0,10);
						this.time = datetime.slice(11,22);
					}
					else{
						this.date = "null";
						this.time = "11:59:59 PM";
					}
					if((this.category == "")){
						this.category = "N/A";
					}
					if((this.project == "")){
						this.project = "N/A";
					}
					app.todoModel.set({
						task:this.data,
						date:this.date,
						time:this.time,
						priority:this.priority,
						project:this.project,
						category:this.category
					});
					var obj=new TodoAPI();
					obj.delegate= this;
					obj.startWebService();
				}
	 },
	 AdvOptionsClick:function(){
		 
		function displayResult(item, val, text) {
			    console.log(item);
			    console.log(val);
			    console.log(text);
		}
		$(function(){
		    	console.log(app.categoryJSON);
		        $('#inputCategory').typeahead({
		            source: app.categoryJSON,
		            itemSelected: displayResult
		        });
		});
		$(function(){
	    	console.log(app.projectJSON);
	        $('#inputProject').typeahead({
	            source: app.projectJSON,
	            itemSelected: displayResult
	        });
		});
		$("#advOptions").slideToggle("slow");
	 },
	 AdvOptionsClose:function(){
		 $("#advOptions").slideToggle("slow");
	 },
	 validate:function(){
		if(this.data == ""){ 
			this.showMessage("Field Empty","Please enter todo");
			return false;
		}
		else return true;
	 },
	 didReceiveTodo:function(data){

		 	console.log("didReceiveTodo");
		 	
			app.todoSummaryModel = new TodoSummaryModel(data);
			app.categoryJSON.push(new CategoryModel(data.categories));
			app.projectJSON.push(new MyProjectsModel(data.projects));
			
			//Render todo on TodoSummary view for 5 days.
			if(data.date == DAY_ARRAY[2]){
					app.jsonData.todaySummaryModelArray.push(app.todoSummaryModel);
					
					if(app.todoCount[2]>9){
						if($("#todoToday").find('span.todo-list').hasClass('hide')){
							$("#todoToday span.hide:last ~ .todo-list").first().addClass("hide");
							$("#todoToday span.hide:first ~ .todo-list").first().addClass("hide");
						}
						//$("#todoToday").find('span.todo-list:not(".hide")')).last().addClass("hide");
						
						else $("#todoToday .todo-list").first().addClass('hide');
					}
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date == DAY_ARRAY[3]){
					app.jsonData.tomorrowSummaryModelArray.push(app.todoSummaryModel);
					
					if(app.todoCount[3] > 4){
						if($("#todoTomorrow").find('span.todo-list').hasClass('hide')){
							$("#todoTomorrow span.hide:last ~ .todo-list").first().addClass("hide");
						}
						else $("#todoTomorrow .todo-list").first().addClass('hide');
					}
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date == DAY_ARRAY[4]){
					app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
					
					if(app.todoCount[4] > 4){
						if($("#todoThisWeek").find('span.todo-list').hasClass('hide')){
							$("#todoThisWeek span.hide:last ~ .todo-list").first().addClass("hide");
						}
						else $("#todoThisWeek .todo-list").first().addClass('hide');
					}
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date > DAY_ARRAY[4]){
	 				app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
	 				
	 				if(app.todoCount[4] > 4){
						if($("#todoThisWeek").find('span.todo-list').hasClass('hide')){
							$("#todoThisWeek span.hide:last ~ .todo-list").first().addClass("hide");
						}
						else $("#todoThisWeek .todo-list").first().addClass('hide');
					}
	 				this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 }
});
