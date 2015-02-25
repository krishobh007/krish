var DayPanelView = BaseView.extend({
	 initialize: function(){
		console.log("DayPanelView");
		this.templateName = "dayPanel";
		var obj = new DayPanelAPI();
		obj.delegate= this;
		obj.startWebService();
		return this;
	 },
	 didReceiveDayPanel: function(jsonData) {
		 	this.appendHTML();
			$('#dayOneDate').prepend(jsonData[0].date);
			$('#dayOneDay').prepend(jsonData[0].day);
			$('#dayOneTasks').prepend(jsonData[0].tasks);
			$('#dayOneTodos').prepend(jsonData[0].todo);
			
			$('#dayTwoDate').prepend(jsonData[1].date);
			$('#dayTwoDay').prepend(jsonData[1].day);
			$('#dayTwoTasks').prepend(jsonData[1].tasks);
			$('#dayTwoTodos').prepend(jsonData[1].todo);
			
			$('#dayThreeDate').prepend(jsonData[2].date);
			$('#dayThreeDay').prepend(jsonData[2].day);
			$('#dayThreeTasks').prepend(jsonData[2].tasks);
			$('#dayThreeTodos').prepend(jsonData[2].todo);
			
			$('#dayFourDate').prepend(jsonData[3].date);
			$('#dayFourDay').prepend(jsonData[3].day);
			$('#dayFourTasks').prepend(jsonData[3].tasks);
			$('#dayFourTodos').prepend(jsonData[3].todo);
			
			$('#dayFiveDate').prepend(jsonData[4].date);
			$('#dayFiveDay').prepend(jsonData[4].day);
			$('#dayFiveTasks').prepend(jsonData[4].tasks);
			$('#dayFiveTodos').prepend(jsonData[4].todo);
			
			for(var i=0;i<5;i++){
				app.todoCount[i] = jsonData[i].todo;
			}
	},
	didFailDayPanelFetch : function(){
			this.showMeassge("Error on WebService : DayPanelAPI","DayPanelView loading failed");
	}
});