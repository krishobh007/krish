
var AppRouter = Backbone.Router.extend({
    routes:{
		"" : "myDashboard",
		"dashboard" : "myDashboard",
		"todo" : "myTodo",
		"scribblingpad" : "myScribbingPad",
		"search/:id" : "searchResult",
		"settings" : "mySettings"
	},
    initialize:function () {
    	
        var that = this;	// Keep a pointer - this is not accessible in anonymous functions.
        
        this.todoModel = new TodoModel();
        this.categoryJSON;
        this.projectJSON;
        this.jsonData;
        
        this.todoCount =  new Array();	//Count of Todos in five days of DayPanel.
        this.pendingTodoCount;
        this.weekTodoCount;
        
        this.categoryModelArray = new Array();
        this.projectModelArray = new Array();
        this.scribblingPadSummaryModelArray = new Array();
        this.scribblingPadModel = new ScribblingPadModel();
    },
    initializeView:function () {
    	this.loadPage(new HeaderView({el: "#header"}));
    	this.loadPage(new FooterView({el: "#footer"}));
    	this.loadPage(new MyProjectsView({el: "#myProjects"}));
    	this.loadPage(new QuickLinksView({el: "#quickLinks"}));
		this.loadPage(new NotificationsView({el: "#notifications"}));
		
    	var popup = _.template(tpl.get('popupMessage'));
		$('#popupView').html(popup);
		$('#popupViewOperation').html(popup);
    },
    loadPage:function (page) {
        page.renderHTML();
    },
    myDashboard: function(){
    	$('#body').html("");
    	this.loadPage(new DashBoardView({el: "#body"}));
        this.loadPage(new TodoSummaryView({el: "#todoSummary"}));
        this.loadPage(new DayPanelView({el: "#dayPanel"}));
        this.loadPage(new MeetingsView({el: "#meeting"}));
		this.loadPage(new TaskView({el: "#task"}));
		this.loadPage(new TodoView({el: "#todoApp"}));
		this.loadPage(new ScribblingPadView({el: "#notes"}));
		this.disableIconsNotActive();
		$("#myDashboard span:first").removeClass("dashboard-icon").addClass("dashboard-icon-selected");
    },
    myTodo:function () {
    	$('#body').html("");
        this.loadPage(new MyTodoView({el: "#body"}));
        this.loadPage(new TodoView({el: "#todoApp"}));
        this.disableIconsNotActive();
        $("#myTodos span:first").removeClass("todo-icon").addClass("todo-icon-selected");
        $("#collapseToday").addClass('in');
    },
    searchResult :function (id) {
    	$("#inputSearch").val('');
    	searchData = id;
    	$('#body').html("");
    	this.loadPage(new SearchView({el: "#body"}));
    },
    myScribbingPad :function () {
    	$('#body').html("");
    	this.loadPage(new ScribblingPadSummaryView({el: "#body"}));
        this.loadPage(new ScribblingPadView({el: "#notes"}));
        this.disableIconsNotActive();
        $("#myScribblingPad span:first").removeClass("pad-icon").addClass("pad-icon-selected");
    },
    mySettings:function () {
    	$('#body').html("");
    	this.loadPage(new SettingsView({el: "#body"}));
    	this.disableIconsNotActive();
    	$("#settings span:first").removeClass("settings-icon").addClass("settings-icon-selected");
    },
	disableIconsNotActive : function(){
		
		if(!$("#myDashboard span:first").hasClass('dashboard-icon')) {
			$("#myDashboard span:first").removeClass("dashboard-icon-selected").addClass("dashboard-icon");	
		}
		
		if(!$("#myTodos span:first").hasClass('todo-icon')) {
			$("#myTodos span:first").removeClass("todo-icon-selected").addClass("todo-icon");	
		}
		
		if(!$("#myScribblingPad span:first").hasClass('pad-icon')) {
			$("#myScribblingPad span:first").removeClass("pad-icon-selected").addClass("pad-icon");	
		}
		
		if(!$("#myDocuments span:first").hasClass('doc-icon')) {
			$("#myDocuments span:first").removeClass("doc-icon-selected").addClass("doc-icon");	
		}
		if(!$("#myCalendar span:first").hasClass('calendar-icon')) {
			$("#myCalendar span:first").removeClass("calendar-icon-selected").addClass("calendar-icon");	
		}
		
		if(!$("#settings span:first").hasClass('settings-icon')) {
			$("#settings span:first").removeClass("settings-icon-selected").addClass("settings-icon");	
		}
		
    }
});

