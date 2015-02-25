var baseURL = "";

var element,text,date_temp,currentPage,searchData;

var TODO_SUCCESS_TEXT = 'New Todo added successfully';
var TODO_ERROR_TEXT = 'Todo Adding Failed !!';
var TODO_HELP_TEXT = "<span class='todo-help'>Use + for project, @ for category and keywords today/tomorrow/day/next day Eg : +DaytoDay @feature do task next monday</span>";
var TODO_LOADING_MSG = 'Adding new todo.. please wait ...';

var NOTE_SUCCESS_TEXT = 'New Note added successfully';
var NOTE_ERROR_TEXT = 'Note Adding Failed !!';
var NOTE_HELP_TEXT = 'Press Enter to add note';
var NOTE_LOADING_MSG = 'Adding new note.. please wait ...';

var TODAY = getDate(0);
var TOMORROW = getDate(1);
var CUR_TIME = getCurrentTime();
var TIME_MAX = '11:59:59 PM';

var DAY_ARRAY = new Array();
for(var i=0;i<=5;i++){
	DAY_ARRAY[i] = getDate(i-2);
}

