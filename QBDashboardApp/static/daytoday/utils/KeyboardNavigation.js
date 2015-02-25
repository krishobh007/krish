var setElementForNavigation = function(){

	if(app.pendingTodoCount != 0) {
		element = $("#todoSummary ul#todoPending li").first();
		$("#todoSummary ul#todoPending li").first().removeClass('todo-list').addClass('list-active');
	}
	else if(app.todoCount[2] != 0){
		element = $("#todoSummary ul#todoToday li").first();
		$("#todoSummary ul#todoToday li").first().removeClass('todo-list').addClass('list-active');
	}
	else if(app.todoCount[3] != 0){
		element = $("#todoSummary ul#todoTomorrow li").first();
		$("#todoSummary ul#todoTomorrow li").first().removeClass('todo-list').addClass('list-active');
	}
	else if(app.weekTodoCount != 0){
		element = $("#todoSummary ul#todoThisWeek li").first();
		$("#todoSummary ul#todoThisWeek li").first().removeClass('todo-list').addClass('list-active');
	}
};

$(document).live("keyup", function (e) {
    switch(e.keyCode){
        // left arrow
        case 37:
        	console.log("left arrow");
        	element.removeClass("list-active");
        	element.addClass("todo-list");
        	if(element.prev().length == 0){
        		if(element.parent().parent().prev().length == 0)
        			element = $("#todoSummary ul#todoThisWeek li").last();
        		else
        			element = element.parent().parent().prev().find('ul').children().last();
        	}
        	else
        		element = element.prev();
        		element.removeClass("todo-list");
        		element.addClass("list-active");
        		console.log(element);
            break;

        // right arrow
        case 39:
        	console.log("right arrow");
        	element.removeClass("list-active");
        	element.addClass("todo-list");
        	if(element.next().length == 0){
        		if(element.parent().parent().next().hasClass("modal")){
        			element = $("#todoSummary ul#todoPending li").first();
        		}
        		else
        			element = element.parent().parent().next().find('ul').children().first();
        	}
        	else
        		element = element.next();
        	element.removeClass("todo-list");
        	element.addClass("list-active");
        	console.log(element);
            break;

        // up arrow
        case 38:
        	console.log("up arrow");
        	element.removeClass("list-active");
        	element.addClass("todo-list");
        	if(element.prev().length == 0){
        		if(element.parent().parent().prev().length == 0)
        			element = $("#todoSummary ul#todoThisWeek li").last();
        		else
        			element = element.parent().parent().prev().find('ul').children().last();
        	}
        	else
        		element = element.prev();
        	element.removeClass("todo-list");
        	element.addClass("list-active");
        	console.log(element);
            break;

        // down arrow
        case 40:
        	console.log("down arrow");
        	element.removeClass("list-active");
        	element.addClass("todo-list");
        	if(element.next().length == 0){
        		if(element.parent().parent().next().hasClass("modal"))
        			element = $("#todoSummary ul#todoPending li").first();
        		else
        			element = element.parent().parent().next().find('ul').children().first();
        	}
        	else
        		element = element.next();
        	element.removeClass("todo-list");
        	element.addClass("list-active");
        	console.log(element);
            break;
    }
});
