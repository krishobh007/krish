var that,status="true";
var TodoSummaryView = BaseView.extend({
	 initialize: function(){
	
		console.log("TodoSummaryView");
		this.templateName = "todoSummary";
		this.appendHTML();
		this.params = {};
		
		currentPage = "MyDashboard";
		
		//date picker in edit modal
		$(function() {
		    $('#datetimepickermodal').datetimepicker({
		      language: 'en',
		      pick12HourFormat: true,
		      startDate: minDate,
		      endDate: maxDate
		    });
		});
		//date picker in new todo modal
		$(function() {
		    $('#datetimepickerAddNewTodo').datetimepicker({
		      language: 'en',
		      pick12HourFormat: true,
		      startDate: minDate,
		      endDate: maxDate
		    });
		});
		//task completed checkbox
		$(function() { 
		    $('input[type="checkbox"]').live('click',function() {
		        if($(this).is(':checked')) {
		            status = "false";
		            $('#datetimepickermodal').datetimepicker().children('input').attr("disabled",true); 
		        }
		        else{
		        	status = "true";
		        	$('#datetimepickermodal').datetimepicker().children('input').attr("disabled",false); 
		        }
		    });
		});
		
		/* Navigation of "View More" option in todo summary */
        
        $('#viewMorePending').live('click', function() {
        	$("#activityIndicator").modal('show');
        	app.navigate("todo", true);
        	$("#collapseToday").removeClass('in');
            $("#collapsePending").addClass('in');
            return false;
        });
        $('#viewMoreToday').live('click', function() {
        	$("#activityIndicator").modal('show');
        	app.navigate("todo", true);
            return false;
        });
        $('#viewMoreTomorrow').live('click', function() {
        	$("#activityIndicator").modal('show');
        	app.navigate("todo", true);
        	$("#collapseToday").removeClass('in');
            $("#collapseTomorrow").addClass('in');
            return false;
        });
        $('#viewMoreWeek').live('click', function() {
        	$("#activityIndicator").modal('show');
        	app.navigate("todo", true);
        	$("#collapseToday").removeClass('in');
            $("#collapseWeek").addClass('in');
            return false;
        });
        
        /* Navigation of "View All" option in todo summary */
        
        $('#viewAllTodo').live('click', function(event) {
        	$("#activityIndicator").modal('show');
            app.navigate("todo", true);
            return false;
        });
		
		var todoSummary = new TodoSummaryAPI();
		todoSummary.delegate= this;
		todoSummary.startWebService();
		return this;
	 },
	 events: {
         "click #tasksList #edit": "fetchEditDetails",
         "click #tasksList #view": "fetchViewDetails",
         "click #tasksList #delete": "deleteDetails",
         "click #tasksList #later": "updateDate",
         "click #editDetails #submit": "updateDetails",
         "click #tasksList #today": "updateDate",
         "click #tasksList #completed": "taskCompleted",
         "click #addTodoToday" : "addNewTodoToday",
         "click #addTodoTomorrow" : "addNewTodoTomorrow",
         "click #addTodoWeek" : "addNewTodoWeek",
         "click #addNewTodoSubmit" : "addNewTodoSubmit"
         
	 },
	 didReceiveTodoSummary: function(jsonData) {
		 
		console.log("didReceiveTodoSummary");
		console.log(jsonData);
		app.categoryJSON = app.categoryModelArray;
		app.projectJSON = app.projectModelArray;
		
		app.jsonData = jsonData;
		
		/*	Validating presence of Todos in Pending,Today,Tomorrow and week todos	*/
		
		app.pendingTodoCount = jsonData.pendingTodoSummaryModelArray.length;
		app.weekTodoCount = jsonData.weekSummaryModelArray.length;
		app.todoCount[2] = jsonData.todaySummaryModelArray.length;		// today todo count
		app.todoCount[3] = jsonData.tomorrowSummaryModelArray.length;	// tomorrow todo count
		app.weekHeading = jsonData.heading;
		$("#weekHeading").prepend(app.weekHeading);

		if(app.pendingTodoCount == 0){
			$("#todoPendingCount").html(app.pendingTodoCount);
			
			renderNoTodos("#todoPending","There is no pending todos");
			
			$(".viewMorePending").hide();
			console.log("No pending todo");
		}
		else{
			renderPendingTodos(this);
		}
		if(app.todoCount[2] == 0){
			
			renderNoTodos("#todoToday","There is no todo Today");
			
			$("#todoTodayCount").html(app.todoCount[2]);
			console.log("No todo Today");
			$(".viewMoreToday").hide();
		}
		else{
			renderTodaysTodos(this);
		}
		if(app.todoCount[3] == 0){

			renderNoTodos("#todoTomorrow","There is no todo Tomorrow");
			
			$("#todoTomorrowCount").html(app.todoCount[3]);
			console.log("No todo Tomorrow");
			$(".viewMoreTomorrow").hide();
		}
		else{
			renderTomorrowsTodos(this);
		}
		if(app.weekTodoCount == 0){
			
			renderNoTodos("#todoThisWeek","There is no todo "+app.weekHeading);
			
			$("#todoWeekCount").html(app.weekTodoCount);
			console.log("No todo "+app.weekHeading);
			$(".viewMoreWeek").hide();
		}
		else{
			renderWeekTodos(this);
		}
		setElementForNavigation();
		$("#activityIndicator").modal('hide');	// Dashboard activity indicator close here.
	 },
	 didFailTodoSummaryFetch:function(){
		 this.showMeassge("Error on WebService : TodoSummaryAPI","TodoSummaryView loading failed");
	 },
	 fetchEditDetails:function(e){
		 this.fetchDetails(e,"edit");
	 },
	 fetchViewDetails:function(e){
		 this.fetchDetails(e,"view");
	 },
	 fetchDetails:function(e,operation){
		 console.log("fetchDetails"+operation);
		 
		 this.todoId = e.target.parentNode.parentNode.parentNode.parentNode.id;
		 console.log(this.todoId);
		 //pending task
		 for( var i in (app.jsonData.pendingTodoSummaryModelArray )){
			 if(app.jsonData.pendingTodoSummaryModelArray[i].id == this.todoId){
				 if(operation == "edit"){
					 this.fillModalData(app.jsonData.pendingTodoSummaryModelArray[i]);
					 $('#editDetails').modal('show');
				 }
				 else if(operation == "view"){
					 this.appendViewModalData(app.jsonData.pendingTodoSummaryModelArray[i]);
					 $('#viewDetails').modal('show');
				 }
				 return true;
			 }
		 }
		 //today
		 for( var i in (app.jsonData.todaySummaryModelArray )){
			 if(app.jsonData.todaySummaryModelArray[i].id == this.todoId){
				 if(operation == "edit"){
					this.fillModalData(app.jsonData.todaySummaryModelArray[i]);
					console.log(app.jsonData.todaySummaryModelArray[i]);
					$('#editDetails').modal('show');
				 }
				 else if(operation == "view"){
					 this.appendViewModalData(app.jsonData.todaySummaryModelArray[i]);
					 $('#viewDetails').modal('show');
				 }
				 return true;
			 }
		 }
		 //tomorrow
		 for( var i in (app.jsonData.tomorrowSummaryModelArray )){
			 if(app.jsonData.tomorrowSummaryModelArray[i].id == this.todoId){
				 if(operation == "edit"){
					 this.fillModalData(app.jsonData.tomorrowSummaryModelArray[i]);
					 $('#editDetails').modal('show');
				 }
				 else if(operation == "view"){
					 this.appendViewModalData(app.jsonData.tomorrowSummaryModelArray[i]);
					 $('#viewDetails').modal('show');
				 }
				 return true;
			 }
		 }
		 //week task
		 for( var i in (app.jsonData.weekSummaryModelArray )){
			 if(app.jsonData.weekSummaryModelArray[i].id == this.todoId){
				 if(operation == "edit"){
					this.fillModalData(app.jsonData.weekSummaryModelArray[i]);
					$('#editDetails').modal('show');
				 }
				 else if(operation == "view"){
					 this.appendViewModalData(app.jsonData.weekSummaryModelArray[i]);
					 $('#viewDetails').modal('show');
				 }
				 return true;
			 }
		 }
	 },
	 
	 fillModalData:function(object){
		 console.log("fillModalData");
		 console.log(object);
		 this.newDate = YMD_to_Date(object.date,object.time);
		 var selectedDate = Date_toYMD(this.newDate);
		 this.curDate = selectedDate.substring(0,10);
		 this.curTime = selectedDate.substring(11,22);
		 date_temp =  object.date ;
		 
		 this.dispalyDate = object.date+" "+get12HrFormat(object.time);
		 
		 $('#datetimepickermodal').datetimepicker().children('input').val(this.dispalyDate);
		 $("#editTask").val(object.task);
		 $("#editPriority").val(object.priority);
		 $("#editCategory").val(object.category);
		 $("#editProject").val(object.project);
		 $("#editStatus").val(object.status);
		 
		 if(object.status == false){
			 $("#editStatus").prop('checked', true);
			 $('#datetimepickermodal').datetimepicker().children('input').attr("disabled",true); 
		 }
		 else{
			 $("#editStatus").prop('checked', false);
			 $('#datetimepickermodal').datetimepicker().children('input').attr("disabled",false); 
		 }
		 function displayResult(item, val, text) {
			    console.log(item);
			    console.log(val);
			    console.log(text);
		 }
		 $(function(){
		    	var sourceCategory = app.categoryJSON;
		        $('#editCategory').typeahead({
		            source: sourceCategory,
		            itemSelected: displayResult
		        });
		 });
		 $(function(){
		    	var sourceProject = app.projectJSON;
		        $('#editProject').typeahead({
		            source: sourceProject,
		            itemSelected: displayResult
		        });
		 });
		 that = this;
		 $('#datetimepickermodal').datetimepicker().on('changeDate',function(){
		    	console.log("change event");
		    	that.newDate = $('#datetimepickermodal').datetimepicker().children('input').val();
		    	that.curDate = that.newDate.substring(0,10);
		    	that.curTime = that.newDate.substring(11,22);
		 });
	 },
	 
	 appendViewModalData:function(object){
		 console.log("appendViewModalData");
		 console.log(object);
		 this.dispalyDate = object.date+" "+get12HrFormat(object.time);
		 
		 $("#viewDate").html(this.dispalyDate);
		 $("#viewTask").html(object.task);
		 $("#viewCategory").html(object.category);
		 $("#viewProject").html(object.project);
		 
		 if(object.priority == 0){
			 $("#viewPriority").html("Low");
		 }
		 else if(object.priority == 1){
			 $("#viewPriority").html("Medium");
		 }
		 else if(object.priority == 2){
			 $("#viewPriority").html("High");
		 }
		 
		 if(object.status == false){
			 $("#viewStatus").html("Completed");
		 }
		 else if(object.status == true){
			 $("#viewStatus").html("Not completed");
		 }
	 },
	 updateDetails:function(){
		 console.log("update Details");
		 $('#editDetails').modal('hide');
		 console.log($('#datetimepickermodal').datetimepicker().children('input').val());
		 this.status = status;
		 
		 if(date_temp == that.curDate){
			 console.log("no chnge in date");
		 }
		 else{
			 console.log("date chnged");
		 }
		 
		 //delete the old data from  model
		 todoSummaryViewDelete(this.todoId,this);
		 $("#"+this.todoId).remove();	
		 
		 app.todoModel.set({
			task:$("#editTask").val(),
			date: that.curDate,
			time: that.curTime,
			priority:$("#editPriority").val(),
			project:$("#editProject").val(),
			category:$("#editCategory").val(),
			status: this.status,
			id: this.todoId
		 });
		 var updateTodo = new UpdateTodoAPI();
		 updateTodo.delegate= this;
		 updateTodo.startWebService();
	 },
	 deleteDetails:function(e){
		 this.todoId = e.target.parentNode.parentNode.parentNode.parentNode.id;
		 this.data = $("span#"+this.todoId).children().find('#taskName').text();
		 this.confirmMessage("Press ok to delete the item Todo '"+this.data+"'","delete",this);
	 },
	 updateDate: function(e){
		 
		 this.todoId = e.target.parentNode.parentNode.parentNode.parentNode.id;
		 console.log(e.target.id);
		 console.log(this.todoId);
		
		 if(e.target.id == "later")
			 this.confirmMessage("Press ok to postpone the item Todo #"+this.todoId+" to next day","later",this);
		 else if(e.target.id == "today")
			 this.confirmMessage("Press ok to postpone the item Todo #"+this.todoId+" to today","today",this); 
		
	 },
	 updateTodoDate : function(operation){
		
		 //pending
		 for( var i in (app.jsonData.pendingTodoSummaryModelArray )){
			 if(app.jsonData.pendingTodoSummaryModelArray[i].id == this.todoId){
				 this.curDate = app.jsonData.pendingTodoSummaryModelArray[i].date;
				 this.curTime = app.jsonData.pendingTodoSummaryModelArray[i].time;
			 }
		 }
		 //today
		 for( var i in (app.jsonData.todaySummaryModelArray )){
			 if(app.jsonData.todaySummaryModelArray[i].id == this.todoId){
				 this.curDate = app.jsonData.todaySummaryModelArray[i].date;
				 this.curTime = app.jsonData.todaySummaryModelArray[i].time;
			 }
		 }
		 //tomorrow
		 for( var i in (app.jsonData.tomorrowSummaryModelArray )){
			 if(app.jsonData.tomorrowSummaryModelArray[i].id == this.todoId){
				 this.curDate = app.jsonData.tomorrowSummaryModelArray[i].date;
				 this.curTime = app.jsonData.tomorrowSummaryModelArray[i].time;
			 }
		 }
		 //week task
		 for( var i in (app.jsonData.weekSummaryModelArray )){
			 if(app.jsonData.weekSummaryModelArray[i].id == this.todoId){
				 this.curDate = app.jsonData.weekSummaryModelArray[i].date;
				 this.curTime = app.jsonData.weekSummaryModelArray[i].time; 
			 }
		 }
		 
		 //remove old list
		 todoSummaryViewDelete(this.todoId,this);
		 $("#"+this.todoId).remove();
		 
		 if(operation == "later"){
			 this.dateSelected = getTomorrow(this.curDate.toString(),1);
			 this.timeSelected = this.curTime;
		 }
		 else if(operation == "today"){
			 this.dateSelected = TODAY;
			 this.timeSelected = this.curTime;
		 }
		 app.todoModel.set({
				task:"",
				date:this.dateSelected,
				time: this.timeSelected,
				priority:"",
				project:"",
				category:"",
				status: "",
				id: this.todoId
		 });
		 
		 var updateDateTodo = new UpdateDateTodoAPI();
		 updateDateTodo.delegate= this;
		 updateDateTodo.startWebService();
	 },
	 didReceiveDeleteTodo:function(todoId){
		 	console.log("didReceiveDeleteTodo");
		 	todoSummaryViewDelete(todoId,this);
		 	setTimeout(function(){
				 $('span#'+todoId).fadeOut('slow');
				 $('span#'+todoId).css('background-color','red');
			},2000);
		 	//TODO
	 },
	 didFailedDeleteTodo :function(){
		 $('span#'+this.todoId).css('background-color','#FAFAFA');
	 },
	 didReceiveUpdateDateTodo:function(data){
		 	console.log("didReceiveUpdateDateTodo");
		 	todoSummaryViewUpdateDate(data,this);
		 	
		 	$('span#'+data.taskid).css('background-color','yellow');
		 	setTimeout(function(){
				 $('span#'+data.taskid).css('background-color','white');
			},2000);
	 },
	 didReceiveUpdateTodo:function(data){
		 	console.log("didReceiveUpdateTodo");
			todoSummaryViewUpdateTodo(data,this);
	 },
	 didReceiveTaskCompleted:function(taskId){
		 console.log("didReceiveTaskCompleted");
		 var todoRef = $('span#'+taskId);
		 todoRef.children().find("#taskName").css('text-decoration','line-through');
		 console.log(todoRef.children("#boxType"));
		 todoRef.children("#boxType").addClass("completed"); 
		 
		 $('span#'+taskId).css('background-color', '#64FE2E');
		 setTimeout(function(){
			 $('span#'+taskId).css('background-color','white');
		 },1000);
		 
		 todoSummaryViewCompleted(taskId,this);
		
	 },
	 selectedOperation:function(operation){
		 console.log(operation+"Note");
		 if(operation == "delete"){
			 $('span#'+this.todoId+" #boxType").css('background-color','red');
			 var deleteTodo = new DeleteTodoAPI(this.todoId);
			 deleteTodo.delegate= this;
			 deleteTodo.startWebService();
			 console.log("deleteDetails"+this.todoId);
			 return true;
		 }
		 else if(operation == "later"||operation == "today"){
			 	this.updateTodoDate(operation);
			 	return true;
		 }
	 },
	 taskCompleted:function(e){
		this.todoId = e.target.parentNode.parentNode.parentNode.parentNode.id;
		
		var taskCompleted = new TaskCompletedAPI(this.todoId);
		taskCompleted.delegate= this;
		taskCompleted.startWebService();
		console.log("taskCompleted"+this.todoId); 
		return true;
	 },
	 addNewTodoToday : function(){
		 console.log("addNewTodoToday");
		 $('#datetimepickerAddNewTodo').datetimepicker().children('input').val(TODAY+" "+TIME_MAX);
		 this.addNewTodo();
	 },
	 addNewTodoTomorrow : function(){
		 console.log("addNewTodoTomorrow");
		 $('#datetimepickerAddNewTodo').datetimepicker().children('input').val(TOMORROW+" "+TIME_MAX);
		 this.addNewTodo();
	 },
	 addNewTodoWeek : function(){
		 console.log("addNewTodoTomorrow"+app.weekHeading);
		 
		 if(app.weekHeading == "Next Week"){
			 $('#datetimepickerAddNewTodo').datetimepicker().children('input').val((DAY_ARRAY[5])+" "+TIME_MAX);
		 }
		 else{
			 $('#datetimepickerAddNewTodo').datetimepicker().children('input').val((DAY_ARRAY[4])+" "+TIME_MAX);
		 }
		 this.addNewTodo();
	 },
	 addNewTodo: function(){
	
		 $("#addNewTodo").modal('show');
		 
		 function displayResult(item, val, text) {
			    console.log(item);
			    console.log(val);
			    console.log(text);
			}
			$(function(){
			    	console.log(app.categoryJSON);
			        $('#inputCategoryNewTodo').typeahead({
			            source: app.categoryJSON,
			            itemSelected: displayResult
			        });
			});
			$(function(){
		    	console.log(app.projectJSON);
		        $('#inputProjectNewTodo').typeahead({
		            source: app.projectJSON,
		            itemSelected: displayResult
		        });
			});
	 },
	 addNewTodoSubmit: function(){
		 
		 	this.data = $("#inputTodoNewTodo").val();
			var datetime = $("#inputDateNewTodo").val();
			this.category = $("#inputCategoryNewTodo").val();
			this.project = $("#inputProjectNewTodo").val();
			this.priority = $("#inputPriorityNewTodo").val();
			
			$("#inputTodoNewTodo").val("");
			$("#inputCategoryNewTodo").val("");
			$("#inputProjectNewTodo").val("");
			$("#inputDateNewTodo").val("");
			
			if(this.validate()){
				
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
			$("#addNewTodo").modal('hide');
			console.log("addNewTodoSubmit");
	 },
	 validate:function(){
			if(this.data == ""){ 
				this.showMessage("Field Empty","Please enter todo");
				return false;}
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
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date == DAY_ARRAY[3]){
					app.jsonData.tomorrowSummaryModelArray.push(app.todoSummaryModel);
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date == DAY_ARRAY[4]){
					app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
					this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 		else if(data.date > DAY_ARRAY[4]){
	 				app.jsonData.weekSummaryModelArray.push(app.todoSummaryModel);
	 				this.appendTodoSummaryData(data.taskid,data.date);
	 		}
	 }
});





