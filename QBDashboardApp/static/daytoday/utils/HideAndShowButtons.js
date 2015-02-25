//hide buttons

function hideElement(element,text){
	
	$(element).find('#edit').hide();
	$(element).find('#today').hide();
	$(element).find('#view').hide();
	$(element).find('#completed').hide();
	$(element).find('#later').hide();
	$(element).find('#delete').hide();
	if($(element).find('span#boxType').hasClass('completed'))
	$(element).find('#taskName').html(text);
}

//show buttons for today & above
function showButton(element){
	$(element).find('#delete').show();
	$(element).find('#edit').show();
	$(element).find('#view').show();
	if(!$(element).find('span#boxType').hasClass('completed')){
		$(element).find('#completed').show();
		$(element).find('#later').show();
	}	
	if($(element).parent().attr('id') =='todoTomorrow'||$(element).parent().attr('id') =='todoThisWeek')
		$(element).find('#today').show();
}

