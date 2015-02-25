$(document).ready(function(){
	
	$("#activityIndicator").modal('show');
	
	        var templates = [ 'Dashboard','MyTodoPage','MyTodoPageList',
	                          'ScribblingPadSummaryPage','ScribblingPadSummaryList',
	                          'SearchResultPage','SearchResultList',
	                          'header', 'help', 'dayPanel', 'todo',
	                          'meetings', 'quickLinks', 'Tasks', 'myProjects',
	                          'Notifications', 'todoSummary', 'todoList',
	                          'noTodo', 'scribblingPad','popupMessage','todoProjectList',
	                          'Settings','footer'
	                        ];
	        
			console.log('document ready');
			
			// loads all the templates
			tpl.loadTemplates(templates, function(){
				app = new AppRouter();
				app.initializeView();
				Backbone.history.start();
			});
			
			var todoName,text;
			
			$("#todoSummary .todo-list").live("mouseover",function(){
					todoName = $(this).children().find('#taskName').text();
					text = todoName;
					
					$(this).children().find('#taskName').html(todoName);
					var category = $(this).children().find('#taskCategory').text();
					var project = $(this).children().find('#taskProject').text();
					
					if(category=='' && project==''){
						if(todoName.length>100)
							$(this).children().find('#taskName').html(todoName.substring(0,100)+"..");
						else
							$(this).children().find('#taskName').html(todoName);	
					}
					else if(category==''){
						$(this).children().find('#taskDetails').show();
						$(this).children().find('.todo-project').show();
						if(todoName.length > 20)
						$(this).children().find('#taskName').html(todoName.substring(0,20)+"..");
					}
					else if( project==''){
						$(this).children().find('#taskDetails').show();
						$(this).children().find('.todo-category').show();
						if(todoName.length > 20)
						$(this).children().find('#taskName').html(todoName.substring(0,20)+"..");
					}
					else{
						$(this).children().find('#taskDetails').show();
						$(this).children().find('.todo-category').show();
						$(this).children().find('.todo-project').show();
						if(todoName.length > 20)
						$(this).children().find('#taskName').html(todoName.substring(0,20)+"..");
					}
					
					showButton(this);
			});
			$("#todoSummary .todo-list").live("mouseout",function(){
				hideElement(this,todoName);
				$(this).children().find('#taskDetails').hide();
				$(this).children().find('#taskName').html(text);
			});
});


