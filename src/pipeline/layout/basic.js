import metawidget from 'metawidget';
import React from 'react';


function genericField(widget, elementName, attributes) {
  return (
    <div key={attributes.name}>
      <label htmlFor={attributes.name}>{metawidget.util.uncamelCase(attributes.name)}:</label>
      {widget()}
    </div>
  );
}

function buttonField(widget, elementName, attributes) {
  return widget({ key: attributes.name });
}

export default function layoutWidget(widget, elementName, attributes, container, mw) {
  let layoutBuilder;
  switch (widget.type) {
    case 'button':
      layoutBuilder = buttonField;
      break;
    default:
      layoutBuilder = genericField;
  }
  container.push(layoutBuilder(widget, elementName, attributes, container, mw));
}
