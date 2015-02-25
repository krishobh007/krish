var ScribblingPadSummaryView = TodoSummaryView.extend({
	 initialize: function(){
	
		this.templateName = "ScribblingPadSummaryPage";
		this.appendHTML();
		currentPage = "ScribblingPad";
		
		var obj=new ScribblingPadSummaryAPI();
		 	obj.delegate= this;
			obj.startWebService();
	 },
	 events: {
         "click .icon-trash": "deleteNote"
	 },
	 deleteNote: function(e) {
		 e.preventBubble=true;
		 this.noteId = e.target.parentNode.parentNode.id;
		 console.log(this.noteId);
		 this.confirmMessage("Press ok to delete the item Note #"+this.noteId,"delete",this);
	 },
	 selectedOperation:function(operation){
		 if(operation == "delete"){
			 $('tr#'+this.noteId).css('background-color','red');
			 var deleteNote = new DeleteNoteAPI(this.noteId);
			 deleteNote.delegate= this;
			 deleteNote.startWebService();
			 return true;
		 }
	 },
	 didReceiveScribblingPadSummary: function(jsonData) {
		 if(jsonData.length == 0){
			 $("#scribblingData").html("<li class='align-center'>No result Data</li>");
		 }
		 else{
			 for( var i=0; i < jsonData.length ;i++) {	
				 this.renderScribblingPadSummary(jsonData[i]);
			 }
		 }
		 $("#activityIndicator").modal('hide');
	 },
	 didReceiveDeleteNote:function(noteId){
		 	this.scribblingPadSummaryViewDelete(noteId);
		 	setTimeout(function(){
				 $('tr#'+noteId).fadeOut('slow');
				 $('tr#'+noteId).css('background-color','red');
			},2000);
	 },
	 scribblingPadSummaryViewDelete:function(noteId){
		 for( var i in app.scribblingPadSummaryModelArray ) {
			 if(noteId == app.scribblingPadSummaryModelArray[i].id){
				delete app.scribblingPadSummaryModelArray[i];
			 }
		 }
	 }
});
