// Define game view
FED2.GameView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "tr",
	
	// Set reference to template
    template: $("#gameTemplate").html(),
	
	// Initialize view *(backbone method)*
	initialize: function () {
	},
	
	// Render view *(backbone method)*
    render: function () {
		// Store template in variable
        var tmpl = _.template(this.template);
		
		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

		return this;
    }
});