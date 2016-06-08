import noop from 'lodash/noop';
import metawidget from 'metawidget';
import React, { Component, PropTypes } from 'react';

import builderFactory from 'src/pipeline/builder';
import populateProcessor from 'src/pipeline/processors/populate';
import addIdProcessor from 'src/pipeline/processors/addId';
import layoutWidget from 'src/pipeline/layout';


export default class Metawidget extends Component {
  static propTypes = {
    toInspect: PropTypes.object,
    config: PropTypes.object,
    widgetBuilder: PropTypes.func,
    widgetProcessors: PropTypes.arrayOf(PropTypes.func),
    layout: PropTypes.func,
  };

  static defaultProps = {
    widgetBuilder: builderFactory(toInspect),
    widgetProcessors: [populateProcessor(toInspect), addIdProcessor(toInspect)],
    layout: layoutWidget,
  };

  clearWidgets = noop;
  buildNestedMetawidget = () => {};
  overriddenNodes = [];

  render() {
    const { config, toInspect, widgetBuilder, widgetProcessors, layout } = this.props;
    const container = [];
    const pipeline = new metawidget.Pipeline(container);

    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = widgetBuilder;
    pipeline.widgetProcessors = widgetProcessors;
    pipeline.layout = layout;
    pipeline.configure(config);
    const inspected = pipeline.inspect(toInspect);
    pipeline.buildWidgets(inspected, this);

    return (
      <div>{container}</div>
    );
  }
}
