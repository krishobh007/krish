function NotificationsModel(responseData) {
	this.pending_leave_request = responseData.pending_leave_request;
	this.holidays = responseData.holidays;
	this.birthdays = responseData.birthdays;
}