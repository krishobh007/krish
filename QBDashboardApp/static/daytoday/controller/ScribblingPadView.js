var ScribblingPadView = BaseView.extend({
	 initialize : function(){
		this.templateName = "scribblingPad";
		this.appendHTML();
		$('#scriblingPadInfoBlock .alert').hide();
		/*
		//help info for creating new todo.
		$(function (){
			$("#quickNote").popover({
				title: 'Scribbling pad Help',
				placement : 'right',
				content: NOTE_HELP_TEXT,
				trigger:'focus',
				html:'true'
			});  
		}); 
		*/
		$("textarea#quickNote").keyup(function(){
		    $("#quickNoteCount").text("Characters left: " + (650 - $(this).val().length));
		});
		return this;
	 },
	 events: {
         "keyup #quickNote" : "createNoteKeyPress",
		 "click #createQuickNote" : "createNoteClick"
	 },
	 createNoteClick:function(){
		 this.saveNote();
	 },
	 createNoteKeyPress:function(e){
		 if (e.keyCode === 13) {
			 this.saveNote();
		 }
	 },
	 saveNote : function(){
		 this.note = $("#quickNote").val();
		 this.noteLength = this.note.length;
		 $("#quickNote").val("");
		 $('#quickNote').popover('hide');
		 if(this.validate()){
			$('#scriblingPadInfoBlock .alert').hide(); 
			$('#scriblingPadInfoBlock .alert-info').show().html(NOTE_LOADING_MSG); 
		 	app.scribblingPadModel.set({
				 task:this.note 
			});
			var obj = new ScribblingPadAPI();
				obj.delegate= this;
				obj.startWebService();
		 }
	 },
	 validate:function(){
		 	console.log("this.noteLength="+this.noteLength);
		 	
			if(this.note == "" || this.note =="\n"){
				this.showMessage("Field Empty","Please enter note");
				return false;
			}
			else if(this.noteLength > 650){
				this.showMessage("Length exeed","Maximum 650 characters allowed");
				return false;
			}
			else return true;
	 },
	 didReceiveNotes:function(data){
		 if(currentPage == "ScribblingPad"){
			 app.scribblingPadSummaryModel = new ScribblingPadSummaryModel(data);
			 app.scribblingPadSummaryModelArray.push(app.scribblingPadSummaryModel);
			 this.renderScribblingPadSummary(app.scribblingPadSummaryModel);
		 }
	 }
});
