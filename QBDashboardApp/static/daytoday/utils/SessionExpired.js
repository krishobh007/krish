var SESSION_EXPIRED = "your session expired refresh page to login again";
var SESSION_EXPIRED_MSG = "Your session expired !! Press ok to refresh page and login again";

var sessionExpired = function(){
	alert(SESSION_EXPIRED_MSG);
	location.reload();
};