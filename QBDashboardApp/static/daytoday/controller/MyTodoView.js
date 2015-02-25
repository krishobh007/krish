var MyTodoView = TodoSummaryView.extend({
	 initialize: function(){
	
		console.log("DashBoardView");
		
		this.templateName = "MyTodoPage";
		this.appendHTML();
		currentPage = "MyTodo";
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
		
		var todoSummary = new TodoSummaryAPI();
		todoSummary.delegate= this;
		todoSummary.startWebService();
		return this;
	 }
});
