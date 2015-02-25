var MyProjectsView = BaseView.extend({
	 initialize: function(){
		console.log("MyProjectsView");
		this.templateName = "myProjects";
		var obj=new MyProjectsAPI();
		obj.delegate= this;
		obj.startWebService();
	 },
	 didReceiveMyProjects: function(jsonData) {
		// For MyProjects view
		for(var i=0; i < 5 && i < jsonData.length; i++){
			this.appendHTML();
			$('li#project').last().append(jsonData[i].name);
		}
	 },
	 didFailMyProjectsFetch : function() {
		 this.showMeassge("Error on WebService : MyProjectsAPI","MyProjectsView loading failed");
	 }
});