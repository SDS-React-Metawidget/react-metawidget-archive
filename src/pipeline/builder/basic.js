import metawidget from 'metawidget';
import get from 'lodash/get';
import React from 'react';


function noopField() {}

function textareaField() {
  const widget = (props) => (<textarea {...props} />);
  widget.type = 'textarea';
  return widget;
}

function inputField() {
  const widget = (props) => (<input type="text" {...props} />);
  widget.type = 'input';
  return widget;
}

function buttonAction(toInspect, elementName, attributes) {
  const widget = (props) => (
    <button onClick={toInspect[attributes.name]} {...props}>
      {metawidget.util.uncamelCase(attributes.name)}
    </button>
  );
  widget.type = 'button';
  return widget;
}

export default function buildWidgetFactory(toInspect) {
  return (elementName, attributes, mw) => {
    let widgetBuilder;
    switch (get(attributes, 'type')) {
      case 'string':
        widgetBuilder = attributes.large
          ? textareaField
          : inputField;
        break;

      case 'function':
        widgetBuilder = buttonAction;
        break;

      default:
        widgetBuilder = noopField;
    }
    return widgetBuilder(toInspect, elementName, attributes, mw);
  };
}
