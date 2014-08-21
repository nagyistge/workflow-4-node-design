define(
    ['wf-global/util', 'knockout', 'wf-viewModels/expandable', 'wf-viewModels/variableList', 'wf-viewModels/valueList', 'wf-viewModels/propertyCategoryList'],
    function (util, ko, Expandable, VariableList, ValueList, PropertyCategoryList) {

        function ActivityPresenter(definition, removeCallback) {
            Expandable.call(this, true);

            this.displayName = ko.observable("");
            this.tagName = ko.observable(definition.tagName);
            this.icon = ko.observable(definition.icon || "");
            this.hasResult = ko.observable(definition.hasResult ? true : false);
            this._removeCallback = removeCallback;

            this.variables = ko.observable(definition.canDeclare ? new VariableList() : null);
            this.args = ko.observable(definition.wantArgs ? new ValueList({ title: "Args", createNewText: "Create arg", expanded: true }) : null);
            this.properties = ko.observable(definition.properties ? new PropertyCategoryList(definition.properties) : null);
        }

        util.inherits(ActivityPresenter, Expandable);

        ActivityPresenter.prototype.canRemove = function () {
            return this._removeCallback ? true : false;
        };

        ActivityPresenter.prototype.remove = function () {
            if (this._removeCallback) this._removeCallback(this);
        };

        ActivityPresenter.prototype.isRoot = function () {
            return !this.canRemove();
        };

        return ActivityPresenter;
    });
