var HeaderView = BaseView.extend({
	 initialize: function(){
		this.templateName = "header";
		this.appendHTML();
		
		setInterval(function(){
			$("#currentDate").html(getCurrentDay());
		},1000);
		
		var obj = new HeaderAPI();
		obj.delegate= this;
		obj.startWebService();
		return this;
	 },
	 events: {
		 "keyup input#inputSearch" : "searchDataEnter",
		 "click button#btnSearch":"searchDataClick",
		 "click #myDashboard" : "loadMyDashboard",
		 "click #myTodos" : "loadMyTodo",
		 "click #myScribblingPad" : "loadMyScribblingPad",
		 "click #settings" : "loadSettings"
	 },
	 searchDataEnter:function(e){
		 if (e.keyCode === 13) {
			 	this.searchData();
			 	console.log("searchDataEnter");
		 }
	 },
	 searchDataClick:function(){
		 		this.searchData();
		 		console.log("searchDataClick");
	 },
	 searchData:function(){
		 	$("#activityIndicator").modal('show');
			id = $("#inputSearch").val();
			console.log("id//////"+id);
			app.navigate("search/"+id, true);
	 },
	 loadMyDashboard:function(){
		if(currentPage == "MyDashboard"){
     		console.log("on same page : MyDashboard");
		}
		else{
			$("#activityIndicator").modal('show');
			app.navigate("dashboard", true);
		}
	 },
	 loadMyTodo:function(){
		if(currentPage == "MyTodo"){
     		console.log("on same page : MyTodo");
     	}
     	else{
     		$("#activityIndicator").modal('show');
     		app.navigate("todo", true);
     	}
	 },
	 loadMyScribblingPad : function() {
		if (currentPage == "ScribblingPad") {
			console.log("on same page : ScribblingPad");
		}
		else {
			$("#activityIndicator").modal('show');
			app.navigate("scribblingpad", true);
		}
	 },
	 loadSettings:function(){
		if(currentPage == "Settings"){
     		console.log("on same page : Settings");
     	}
 		else{
 			$("#activityIndicator").modal('show');
 			app.navigate("settings", true);
 		}
	 },
	 didReceiveHeader: function(jsonData) {
		 $("#empName").html(jsonData.name);
		 $("#empMail").html(jsonData.email);
		 if(jsonData.desig !=""){
			 $("#empDesignation").html(jsonData.desig);
		 }
		 else $("#empDesignation").html("Software Engineer");
		 
		 $("#logout a").attr("href",baseURL+"logout");
	 },
	 didFailHeaderFetch : function(){
		this.showMeassge("Error on WebService : HeaderAPI","HeaderView loading failed"); 	
	 }
});