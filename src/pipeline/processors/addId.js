function genericField(toInspect, widget, elementName, attributes) {
  return Object.assign((props) => {
    return widget({
      ...props,
      id: attributes.name,
    });
  }, widget);
}

export default function processorFactory(toInspect) {
  return (widget, elementName, attributes, mw) => {
    if (!widget) return null;
    return genericField(toInspect, widget, elementName, attributes, mw);
  };
}
