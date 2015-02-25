var TodoModel = Backbone.Model.extend({
    defaults: {
		date: TODAY,
		task: '',
		priority:0,
		category:'N/A',
		time: CUR_TIME,
		project:'N/A',
		id:'',
		status:'true'
	}
});