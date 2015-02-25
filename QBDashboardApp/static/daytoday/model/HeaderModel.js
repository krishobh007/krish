function HeaderModel(responseData) {
	this.email = responseData.email_id;
	this.desig = responseData.desig;
	this.name = responseData.first_name+" "+responseData.Last_name;
	this.imageUrl = responseData.image_url;
}