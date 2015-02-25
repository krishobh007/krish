var NotificationsView = BaseView.extend({
	 initialize: function(){
			console.log("NotificationsView");
			this.templateName = "Notifications";
			var obj=new NotificationsAPI();
			obj.delegate= this;
			obj.startWebService();
			return this;
	 },
	 didReceiveNotifications: function(jsonData) {
		 	this.appendHTML();
		 	//$('#notifications #notificationMonth').html(jsonData[0].month);
			$('#notifications #leave').html(jsonData[0].pending_leave_request);
			$('#notifications #holidays').html(jsonData[0].holidays);
			$('#notifications #birthdays').html(jsonData[0].birthdays);
	 },
	 didFailNotifications: function() {
		 	this.showMeassge("Error on WebService : NotificationsAPI","Notifications View loading failed");
	 }
});