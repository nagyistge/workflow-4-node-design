define(
    ['knockout', 'wf-design/activityDesigner', 'wf-common/util', 'text!wf-views/workflowDesigner.html'],
    function (ko, ActivityDesigner, util, html) {
        util.installTemplate('wf-workflow-designer-tmpl', html);

        ko.bindingHandlers.htmlValue = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                ko.utils.registerEventHandler(element, "keydown", function() {
                        var modelValue = valueAccessor();
                        var elementValue = element.innerHTML;
                        if (ko.isWriteableObservable(modelValue)) {
                            modelValue(elementValue);
                        }
                        else { //handle non-observable one-way binding
                            var allBindings = allBindingsAccessor();
                            if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers'].htmlValue) allBindings['_ko_property_writers'].htmlValue(elementValue);
                        }
                    }
                )
            },
            update: function(element, valueAccessor) {
                var value = ko.utils.unwrapObservable(valueAccessor()) || "";
                if (element.innerHTML !== value) {
                    element.innerHTML = value;
                }
            }
        };

        function WorkflowDesigner() {

            // Sample Data
            this.categories = ko.observableArray([
                {
                    name: 'Control Flow',
                    items: [
                        {
                            name: 'Block',
                            icon: 'wf4nd/style/images/block.png',
                            tagName: 'block',
                            canDeclare: true,
                            wantArgs: true,
                            hasResult: true,
                            properties: [
                                {
                                    category: 'Category1',
                                    name: 'anyProp',
                                    type: 'expression' // if this is not present, then default is 'expression'
                                },
                                {
                                    category: 'Category1',
                                    name: 'stringProp',
                                    type: 'string'
                                },
                                {
                                    category: 'Category1',
                                    name: 'numberProp',
                                    type: 'number'
                                },
                                {
                                    category: 'Category2',
                                    name: 'booleanProp',
                                    type: 'boolean'
                                },
                                {
                                    category: 'Category2',
                                    name: 'datetimeProp',
                                    type: 'datetime'
                                },
                                {
                                    category: 'Category2',
                                    name: 'dateProp',
                                    type: 'date'
                                },
                                {
                                    category: 'Category2',
                                    name: 'timeProp',
                                    type: 'time'
                                },
                                {
                                    category: 'Category3',
                                    name: 'enumProp',
                                    type: 'enum',
                                    values: [
                                        {
                                            value: 1,
                                            name: 'One'
                                        },
                                        {
                                            value: 2,
                                            name: 'Two'
                                        },
                                        {
                                            value: 3,
                                            name: 'Three'
                                        }
                                    ]
                                },
                                {
                                    category: 'Category3',
                                    name: 'setProp',
                                    type: 'set',
                                    nullable: false,
                                    defaultValue: 'pear',
                                    values: [
                                        {
                                            value: 'apple',
                                            name: 'Apple'
                                        },
                                        {
                                            value: 'pear',
                                            name: 'Pear'
                                        },
                                        {
                                            value: 'peach',
                                            name: 'Peach'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Parallel',
                            icon: 'wf4nd/style/images/parallel.png',
                            tagName: 'parallel',
                            canDeclare: true,
                            properties: null,
                            wantArgs: true,
                            hasResult: true
                        }
                    ]
                }
            ]);

            this.rootActivity = ko.observable(new ActivityDesigner(this.categories()[0].items[0]));
        }

        return WorkflowDesigner;
    });