function ListView(model, elements) {
    this._model = model;
    this._elements = elements;

 //   this.listModified = new Event(this);
    this.submitButtonClicked = new Event(this);
 //   this.delButtonClicked = new Event(this);

    var _this = this;

    // attach model listeners
    this._model.cardDrawn.attach(function () {
        _this.showResult();
    });
 //   this._model.itemRemoved.attach(function () {
 //       _this.rebuildList();
 //   });

    // attach listeners to HTML controls
 
 //   this._elements.list.change(function (e) {
  //      _this.listModified.notify({ index : e.target.selectedIndex });
  //  });
    this._elements.addButton.click(function () {
        _this.submitButtonClicked.notify();
    });
 //   this._elements.delButton.click(function () {
 //       _this.delButtonClicked.notify();
 //   });
}

ListView.prototype = {
    show : function () {
        this.showResult();
    },

    showResult : function () {
        var list, items, key;

        list = this._elements.list;
        list.html('');

        items = this._model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'));
            }
        }
        this._model.setSelectedIndex(-1);
    }
};


$(function () {
    var model = new ListModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'result': $('#bootcard'),
                'submitButton': $('#plusBtn'),
  //              'delButton': $('#minusBtn')
        }),
        controller = new ListController(model, view);

    view.show();
});
