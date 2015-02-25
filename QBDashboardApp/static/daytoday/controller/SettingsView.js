var SettingsView = BaseView.extend({
	 initialize: function(){
		console.log("SettingsView");
		currentPage = "Settings";
		this.templateName = "Settings";
		this.appendHTML();
		$("#activityIndicator").modal('hide');
		return this;
	 }
});
