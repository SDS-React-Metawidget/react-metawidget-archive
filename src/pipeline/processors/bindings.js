import get from 'lodash/get';


function noopField(toInspect, widget) {
  return widget;
}

function inputField(toInspect, widget, elementName, attributes) {
  return Object.assign((props) => {
    return widget({
      ...props,
      defaultValue: toInspect[attributes.name],
    });
  }, widget);
}

function textareaField(toInspect, widget, elementName, attributes) {
  return Object.assign((props) => {
    return widget({
      ...props,
      defaultValue: toInspect[attributes.name],
    });
  }, widget);
}

export default function processorFactory(toInspect) {
  return (widget, elementName, attributes, mw) => {
    let widgetProcessor;
    switch (get(widget, 'type')) {
      case 'input':
        widgetProcessor = inputField;
        break;

      case 'textarea':
        widgetProcessor = textareaField;
        break;

      default:
        widgetProcessor = noopField;
    }
    return widgetProcessor(toInspect, widget, elementName, attributes, mw);
  };
}
