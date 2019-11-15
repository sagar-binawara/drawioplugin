/**
 * plugin.
 */
Draw.loadPlugin(function (ui) {
    alert('hi')
    

    //----------------------------------- set inlet-outlet property on line connection

    var graph = ui.editor.graph;
    var lineCounter = 0

    var doc = mxUtils.createXmlDocument();


    graph.connectionHandler.addListener(mxEvent.CONNECT, function (state, factoryMethod) {
        var node1 = doc.createElement('MyNode1')
        var node2 = doc.createElement('MyNode2')
        var node3 = doc.createElement('MyNode3')

        firstCell = factoryMethod.properties.cell.source
        secendCell = factoryMethod.properties.cell.target
        firstCellout = graph.getOutgoingEdges(firstCell).length
        // firstCellin = graph.getIncomingEdges(firstCell).length
        // secondCellout = graph.getOutgoingEdges(secendCell).length
        secondCellin = graph.getIncomingEdges(secendCell).length
        // console.log(firstCellin, firstCellout, secondCellin, secondCellout)

        if (factoryMethod.properties.cell.source.value !== '') {
            console.log(graph.view.getState(factoryMethod.properties.cell.source))
            for (var att1, i = 0, atts = factoryMethod.properties.cell.source.value.attributes, n = atts.length; i < n; i++) {
                att1 = atts[i];
                node1.setAttribute(att1.nodeName, att1.nodeValue);
            }
        }
        if (factoryMethod.properties.cell.target.value !== '') {
            for (var att2, i = 0, atts = factoryMethod.properties.cell.target.value.attributes, n = atts.length; i < n; i++) {
                att2 = atts[i];
                node2.setAttribute(att2.nodeName, att2.nodeValue);
            }
        }

        lineCounter = lineCounter + 1
        var lineName = 'line' + lineCounter
        var outlet = 'outlet' + firstCellout
        var inlet = 'inlet' + secondCellin

        node1.setAttribute(outlet, lineName);
        factoryMethod.properties.cell.source.value = node1
        node2.setAttribute(inlet, lineName);
        factoryMethod.properties.cell.target.value = node2
        node3.setAttribute('name', lineName);
        factoryMethod.properties.cell.value = node3

        // console.log(graph.view.getStates().map)
        // console.log(factoryMethod.properties.cell.source.setAttribute('outlet1'))
        // console.log(factoryMethod.properties.cell.target.value)
        // factoryMethod.properties.cell.target.getValue = function () {
        //     console.log(this.value.MyNode2)
        // };

        // console.log(factoryMethod.properties.cell.source)
        // console.log(factoryMethod.properties.cell.target.value)

    })




    //----------------------------------- set counter with name on shapes
    // console.log(ui.editor)
    // graph.getChildVertices().map((item) => {
    //     console.log(item)
    //     // console.log(graph.view.getStates())
    //     // item.getAttribute = function (e) {
    //     //     // console.log(e)
    //     // }
    // })
    // console.log(graph.getAllCells())
    // console.log(ui)

    // var graph = ui.editor.graph;
    // var enabled = true;
    // var counter = 1;
    // var redrawShape = graph.cellRenderer.redrawShape;
    // graph.cellRenderer.redrawShape = function (state, force, rendering) {
    //     var result = redrawShape.apply(this, arguments);
    //     if (result && enabled && graph.model.isVertex(state.cell)) {
    //         if (state.shape != null && state.secondLabel == null) {
    //             var array = []
    //             for (let [x, y] of Object.entries(graph.view.getStates().map)) {

    //                 if (y.style.shape !== 'label') {
    //                     // console.log(graph.cellHighlight.state)
    //                     if (y.shape.stencil.desc.attributes.name.value === state.shape.stencil.desc.attributes.name.value) {
    //                         array.push(y)
    //                     }

    //                     var value = '<div style="padding:2px;border:1px solid gray;background:yellow;border-radius:2px;">' + state.shape.stencil.desc.attributes.name.value + '-' + (array.length) + '</div>';
    //                     state.secondLabel = new mxText(value, counter, new mxRectangle(), mxConstants.VERTICAL_ALIGN);
    //                     state.secondLabel.size = 12;
    //                     state.secondLabel.dialect = state.shape.dialect;
    //                     state.secondLabel.dialect = mxConstants.DIALECT_STRICTHTML;
    //                     graph.cellRenderer.initializeLabel(state, state.secondLabel);
    //                 }
    //             }
    //         }
    //     }
    //     if (state.secondLabel != null) {
    //         // console.log(state.style)
    //         var scale = graph.getView().getScale();
    //         var bounds = new mxRectangle(state.x + state.width - 4 * scale, state.y + 4 * scale, 0, 0);
    //         state.secondLabel.state = state;
    //         state.secondLabel.scale = scale;
    //         state.secondLabel.bounds = bounds;
    //         state.secondLabel.redraw();
    //     }

    //     return result;
    // };


    // var destroy = graph.cellRenderer.destroy;
    // graph.cellRenderer.destroy = function (state) {
    //     console.log(graph)
    //     destroy.apply(this, arguments);

    //     if (state.secondLabel != null) {
    //         // console.log(graph.lastEvent)
    //         // console.log(state)
    //         // console.log(graph.model)
    //         state.secondLabel.destroy();
    //         state.secondLabel = null;
    //     }


    // };


    //----------------------------------- remove 'theme','elipse' from Sub-Menubar by on click

    // $('div.geMenubar').find('a.geItem').on('click', function (e) {

    //     if (this.innerHTML === 'Extras') {
    //         const data1 = $('div.mxPopupMenu.geMenubarMenu table.mxPopupMenu tbody')
    //         $(data1[0]).find('tr:first').remove()
    //         $(data1[0]).find('tr:first').remove()
    //     }
    //     else if (this.innerHTML === 'View') {
    //         const data2 = $('div.mxPopupMenu.geMenubarMenu table.mxPopupMenu tbody')
    //         $(data2[0]).find('tr').filter(":contains('Search')").remove()
    //         $(data2[0]).find('tr').filter(":contains('Scratchpad')").remove()
    //         $(data2[0]).find('tr').filter(":contains('Shapes...')").remove()
    //         $(data2[0]).find('tr td hr:first').remove()
    //     }
    //     else if (this.innerHTML === 'Arrange') {
    //         const data3 = $('div.mxPopupMenu.geMenubarMenu table.mxPopupMenu tbody tr.mxPopupMenuItem')
    //         const subMenu = $(data3).filter(":contains('Insert')")[0].div
    //         $(subMenu).find('tbody tr').filter(":contains('Rectangle')").remove()
    //         $(subMenu).find('tbody tr').filter(":contains('Ellipse')").remove()
    //         $(subMenu).find('tbody tr').filter(":contains('Rhombus')").remove()
    //         $(subMenu).find('tr td hr:first').remove()
    //     }
    // })
});
