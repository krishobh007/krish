var SearchView = TodoSummaryView.extend({
	 initialize: function(){
	
		console.log("SearchView "+searchData);
		
		this.templateName = "SearchResultPage";
		this.appendHTML();
		currentPage = "Search";
		
		var obj=new SearchAPI();
		 	obj.delegate= this;
			obj.startWebService(searchData);
	 },
	 didReceiveSearch: function(jsonData) {
		 console.log("didReceiveSearch");
		 if(jsonData.length == 0){
			 $("#todoSearch").html("<span>No result found matching query '"+searchData+"'</span>");
		 }
		 else{
			 for( var i=0; i < jsonData.length ;i++) {	
				 this.renderTodo(jsonData[i],jsonData[i].id);
			 }
		 }
		 $("#activityIndicator").modal('hide');
	 }
});
