var DashBoardView = BaseView.extend({
	 initialize: function(){
		console.log("DashBoardView");
		this.templateName = "Dashboard";
		this.appendHTML();
		return this;
	 }
	    
});
