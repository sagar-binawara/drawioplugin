/**
 * Sample plugin.
 */
 
    
Draw.loadPlugin(function(ui) {
	alert(" tyr");
 var arr=["test", "test1"];
	var graph = ui.editor.graph;
	var enabled = true;
	var counter = 0;
	var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML =
    this.getResponseHeader("Last-Modified");
  }
};
xhttp.open("GET", "https://www.quora.com/How-can-I-run-my-PHP-content-on-GitHub-pages", true);
xhttp.send();
	
	// Creates the shape for the shape number and puts it into the draw pane
    var redrawShape = graph.cellRenderer.redrawShape;
//     alert("Initial");
	graph.cellRenderer.redrawShape = function(state, force, rendering)
	{
		var result = redrawShape.apply(this, arguments);

		if (result && enabled && graph.model.isVertex(state.cell))
		{
			if (state.shape != null && state.secondLabel == null)
			{	
				var doc = mxUtils.createXmlDocument();
				var node = doc.createElement('MyNode')
node.setAttribute('Prop1', 'Value1');
node.setAttribute('Prop2', 'value2');
				state.cell.value=node;
                var value = '<div style="padding:2px;border:1px solid gray;background:yellow;border-radius:2px;">' + state.style[mxConstants.STYLE_SHAPE]+'=>'+(++counter) +arr[1]+ '</div>';
//                 alert("counter"+counter);
				state.secondLabel = new mxText(value, new mxRectangle(),
                        mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM);
                        

				// Styles the label
				state.secondLabel.size = 12;
				state.secondLabel.dialect = state.shape.dialect;
				state.secondLabel.dialect = mxConstants.DIALECT_STRICTHTML;
				graph.cellRenderer.initializeLabel(state, state.secondLabel);
			}
		}
		
		if (state.secondLabel != null)
		{
			var scale = graph.getView().getScale();
			var bounds = new mxRectangle(state.x + state.width - 4 * scale, state.y + 4 * scale, 0, 0);
			state.secondLabel.state = state;
			state.secondLabel.scale = scale;
			state.secondLabel.bounds = bounds;
			state.secondLabel.redraw();
		}
		
		return result;
	};

	// Destroys the shape number
	var destroy = graph.cellRenderer.destroy;
	graph.cellRenderer.destroy = function(state)
	{
		destroy.apply(this, arguments);
		
		if (state.secondLabel != null)
		{
			state.secondLabel.destroy();
			state.secondLabel = null;
		}
	};
	
	graph.cellRenderer.getShapesForState = function(state)
	{	
// 	 	alert(state.shape);
// 		alert(state.text);
// 		alert(state.secondLabel);
// 		alert(state.control);
// 		alert(state.style);
// 		alert(state.style[mxConstants.STYLE_SHAPE]);
		return [state.shape, state.text, state.secondLabel, state.control];
	};
	
	var validate = graph.view.validate;
	graph.view.validate = function()
	{
		counter = 0;
		validate.apply(this, arguments);
	};
	
	// Extends View menu
	mxResources.parse('number=Number');

    // Adds action
    var action = ui.actions.addAction('number...', function()
    {
		enabled = !enabled;
		graph.refresh();
    });
	
    action.setToggleAction(true);
	action.setSelectedCallback(function() { return enabled; });
    
	var menu = ui.menus.get('view');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'number'], parent);
	};
	
	// Forces refresh if file was loaded before plugin
	if (ui.getCurrentFile() != null)
	{
		graph.refresh();
	}
});
