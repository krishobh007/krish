var FooterView = BaseView.extend({
	 initialize: function(){
		this.templateName = "footer";
		this.appendHTML();
	 },
	 events:{
		 "click .top-link" : "goTop"
	 },
	 goTop:function(){
		 
		$('body,html').animate({
				scrollTop: 0
		}, 800);
		return false;
	 }
});