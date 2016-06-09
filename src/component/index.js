import noop from 'lodash/noop';
import metawidget from 'metawidget';
import React, { Component, PropTypes } from 'react';

import { basic as builderFactory } from 'src/pipeline/builder';
import {
  addId as addIdFactory,
  bindings as bindingsFactory,
} from 'src/pipeline/processors';
import { basic as layoutBuilder } from 'src/pipeline/layout';


export default class Metawidget extends Component {
  static propTypes = {
    toInspect: PropTypes.object,
    config: PropTypes.object,
    widgetBuilderFactory: PropTypes.func,
    widgetProcessorFactories: PropTypes.arrayOf(PropTypes.func),
    layout: PropTypes.func,
  };

  static defaultProps = {
    widgetBuilderFactory: builderFactory,
    widgetProcessorFactories: [
      bindingsFactory,
      addIdFactory,
    ],
    layout: layoutBuilder,
  };

  clearWidgets = noop;
  buildNestedMetawidget = () => {};
  overriddenNodes = [];

  render() {
    const { config, toInspect, widgetBuilderFactory, widgetProcessorFactories, layout } = this.props;
    const container = [];
    const pipeline = new metawidget.Pipeline(container);

    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = widgetBuilderFactory(toInspect);
    pipeline.widgetProcessors = widgetProcessorFactories.map((processor) => processor(toInspect));
    pipeline.layout = layout;
    pipeline.configure(config);
    const inspected = pipeline.inspect(toInspect);
    pipeline.buildWidgets(inspected, this);

    return (
      <div>{container}</div>
    );
  }
}
