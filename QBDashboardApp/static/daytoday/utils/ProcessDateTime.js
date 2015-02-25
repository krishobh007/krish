var minDate = new Date();
var maxDate = new Date(2050,1,1,0,0,0,0);
var timeGlobal;

function getDate(n){
	var d = new Date();
	var day,month,year,tomorrow;
    if (!n){
        n = 0;
    }
    if(typeof(d) === "string"){
        var t = d.split("-"); /* splits  yy-mm-dd format */
        d = new Date(t[0],t[1] - 1,t[2]);
    }
    currentDate = new Date(d.setDate(d.getDate() + n));
	var day = currentDate.getDate();
	if(day< 10) day= "0"+day;
	var month = currentDate.getMonth() + 1;
	if(month< 10) month= "0"+month;
	var year = currentDate.getFullYear();
	var today=year+"-"+month+"-"+day;
	return today;
}

function getCurrentTime(){
	
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	
	var am = true;
	
	if(hours >= 12){
		am = false ;
	}
	if(hours > 12){
		hours = hours-12;
	}
	if(hours == 0){
		hours= 12;
	}
	if (seconds < 10){
		seconds = "0" + seconds;
	}
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	if (hours < 10){
		hours = "0" + hours;
	}
	var time = hours + ":" + minutes + ":" + seconds + " ";
	if(am){
		time = time +"AM";
	} else {
		time = time +"PM";
	}
	
	return time;
}
function get12HrFormat(timeString){
	
	timeString = timeString.split(":");
	
	var hours = timeString[0];
	var minutes = timeString[1];
	var seconds = timeString[2];
	 
	var am="AM";
	
	if(hours > 12){
    	hours = hours-12;
    	am = "PM";
    }
	//var time = hours + ":" + minutes + ":" + seconds + " "+am;
	var time = hours + ":" + minutes  + " "+am;
	return time;
}

function getDateFormat(dateString){
	
	var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	
	var year = dateString.slice(2,4);//13
	var day = dateString.slice(8,10);//05
	var monthCount = parseInt(dateString.slice(5,7));//06
	var month= monthArray[monthCount-1];
	
	var date = day+" "+month+" "+year;//05 Jun 13
	
	return date;
}

function getCurrentDay(){
	var currentDate = new Date();
	var day = currentDate.getDate();
	var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var time = getCurrentTime();
	var time1 = time.slice(0,5);
	var time2 = time.slice(8,11);
	var currentDay = day+" "+dayNames[currentDate.getDay()]+" "+time1+" "+time2;
	return currentDay;
}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

function Date_toYMD(d){
	
    var year, month, day, hours, minutes, seconds, am="AM";
    year = String(d.getFullYear());
    month = String(d.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(d.getDate());
   if (day.length == 1) {
        day = "0" + day;
    }
    hours = String(d.getHours());
    if(hours > 12){
    	hours = hours-12;
    	am = "PM";
    }
    minutes = String(d.getMinutes());
    if(minutes < 10){
    	minutes = "0" +minutes;
    }
    seconds = String(d.getSeconds());
    if(seconds < 10){
    	seconds = "0" +seconds;
    }
    return year + "-" + month + "-" + day + " "+ hours+":"+ minutes+":"+seconds + " "+am;
}

function YMD_to_Date(dateString,timeString){
	//date
	 var dateString = dateString.split("-");
	 var year = dateString[0];
	 var month = dateString[1];
	 var day = dateString[2];
	 //time
	 var timeString = timeString.split(":");
	 var hours = timeString[0];
	 var minutes = timeString[1];
	 var seconds = timeString[2];
	 
	 var d = new Date(year,month-1,day,hours,minutes,seconds);
	 if(hours > 12)
		 hours = hours-12;
	 timeGlobal = hours + ":" + minutes + ":" + seconds + " ";
	 return d;
}

function getDisplayDate(dateString,timeString){
	
	var week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var day = YMD_to_Date(dateString,timeString);
	
	var time = get12HrFormat(timeString);
	
	var date = day.getDate()+" "+week[day.getDay()]+" "+day.getFullYear()+" "+time;
	return date;
	
}

//get next day for specified date
function getTomorrow(d,offset){
	var day,month,year,tomorrow;
    if (!offset){
        offset = 1;
    }
    if(typeof(d) === "string"){
        var t = d.split("-"); /* splits  yy-mm-dd format*/
        d = new Date(t[0],t[1] - 1,t[2]);
    }
    tomorrow = new Date(d.setDate(d.getDate() + offset));
    year = String(tomorrow.getFullYear());
    month = String(tomorrow.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(tomorrow.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
   return year + "-" + month + "-" + day;
}