var TaskView = BaseView.extend({
	 initialize: function(){
		console.log("TaskView");
		this.templateName = 'Tasks';
		var obj=new TaskAPI();
		obj.delegate= this;
		obj.startWebService();
		return this;
	 },
	 didReceiveTask: function(jsonData) {
		 for(var i=0; i < 5 && i < jsonData.length; i++){
		 	this.appendHTML();
			$('li#task').last().html(jsonData[i].task);
		 }
		 if(jsonData.length == 0){
			 this.appendHTML();
			 $('li#task').last().html("No tasks");
		 }
	 },
	 didFailTaskFetch:function(){
		 this.showMeassge("Error on WebService : TaskAPI","TaskView loading failed");
	 }
});