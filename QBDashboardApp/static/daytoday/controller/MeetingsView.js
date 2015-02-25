var MeetingsView = BaseView.extend({
	 initialize: function(){
		console.log("MeetingsView");
		this.templateName = "meetings";
		var obj = new MeetingsAPI();
		obj.delegate= this;
		obj.startWebService();
		return this;
	 },
	 didReceiveMeetings: function(jsonData) {
		 for(var i=0; i < 5 && i < jsonData.length; i++){
			 	this.appendHTML();
				$('li #meetingTopic').last().html(jsonData[i].meeting_topic);
				$('li #meetingTime').last().html(jsonData[i].meeting_time);
		 }
		 if(jsonData.length == 0){
			 this.appendHTML();
			 $('li #meetingTopic').last().html("No Meetings");
		 }
	 },
	 didFailMeetingsFetch:function(){
		 this.showMeassge("Error on WebService :MeetingsAPI","Meeting View loading failed");
	 }
});

