document.addEventListener("DOMContentLoaded", function() {
    var output = $$('#output');
    App = {
        data: {
            'default': [["a1", "b1", "c1"], ["a2", "b2", "c2"], ["a3", "b3", "c3"]],
            'row1key': [["id", "name", "age", "sex"], ["1", "John", "65", "m"], ["2", "Bob", "54", "m"], ["3", "Marcel", "22", "m"], ["4", "Steeve", "22", "m"], ["5", "Jade", "25", "f"]],
            'col1key': [["1", "John"], ["2", "Bob"], ["3", "Marcel"], ["4", "Steeve"], ["5", "Jade"]],
            'duplicate' : [["a","b"],["a","a"],["b","b"],["a","a"],["a","a"],["c","c"],["b","b"]]

        },
        hot : null
    };


    //Make first row or col look like a column header
    var headerRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.TextCell.renderer.apply(this, arguments);
        $(td).css({
            'background': '#F1F1F1',
            'font-weight':'bold'
        });
    };

    App.hot = new Handsontable($$('#hot'), {
        data: App.data.default,
        minSpareCols: 1,
        minSpareRows: 1,
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
    //        cells: function(row, col, prop) {
    //            if (row === 0) {
    //                return { type: { renderer: headerRenderer} };
    //            }
    //        }
    });


    //handsontable actions
    $$('#rowsToColumns').onclick = function() {
        var data = App.hot.getData().clean();
        App.hot.updateSettings({
            data: Handsontable.helper.translateRowsToColumns(data)
        });
    };

    $$('#removeDuplicate').onclick = function() {
        var data = App.hot.getData().clean().uniqueArray();
        App.hot.updateSettings({
            data: data
        });
    };

    //array
    $$('#toJson').onclick = function() {
        var data = App.hot.getData().clean();
        output.value = JSON.stringify(data);
    };

    $$('#toPHPArrayShort').onclick = function() {
        var data = App.hot.getData().clean();
        output.value = data.toPHPArrayShort();
    };

    $$('#toPHPArray').onclick = function() {
        var data = App.hot.getData().clean();
        output.value = data.toPHPArray();
    };

    //assoc
    $$('#toJsonAssoc').onclick = function() {
        var data = App.hot.getData().clean().toAssoc();
        output.value = JSON.stringify(data);
    };

    $$('#toPhpAssociativeArrayShort').onclick = function() {
        data = App.hot.getData().clean().toAssoc();
        output.value = data.toPHPArrayShort();
    };

    $$('#toPhpAssociativeArray').onclick = function() {
        var data = App.hot.getData().clean().toAssoc();
        output.value = data.toPHPArray();
    };

    //assoc field
    $$('#toJsonAssocField').onclick = function() {
        var data = App.hot.getData().clean().toAssocField().groupedBy($$('#grouped').value);
        output.value = JSON.stringify(data);
    };

    $$('#toPhpAssociativeArrayShortField').onclick = function() {
        data = App.hot.getData().clean().toAssocField().groupedBy($$('#grouped').value);
        output.value = data.toPHPArrayShort();
    };

    $$('#toPhpAssociativeArrayField').onclick = function() {
        var data = App.hot.getData().clean().toAssocField().groupedBy($$('#grouped').value);
        output.value = data.toPHPArray();
    };

    $$('#toCustomYml').onclick = function() {
        var s = "";
        var data = App.hot.getData().clean().forEach(function(row, rowId) {
            row.forEach(function(cell, cellId) {
                if(cell.endsWith(':') || cell.indexOf(': ') !== -1) {
                    cell = "\""+cell.replaceAll('"', '\\"')+"\"";
                }
                if(cellId == 0) {
                    s+=cell+":\n";
                } else {
                    s+="  - "+cell+"\n";
                }
            });
        });
        output.value = s;
    };

    var items = $$('.load-data');
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function(a) {
            var datakey = this.getAttribute("data-name");
            App.hot.loadData(App.data[datakey]);
        }
    }

   $$('#grouped').onclick = function() {
       var keys = App.hot.getData().clean()[0];
       var html = "";
       keys.forEach(function(item) {
           html+="<option>"+item+"</option>"; //new Option doesn't work for datalist
       });
       $$('#grouped_list').innerHTML = html;
   };

});