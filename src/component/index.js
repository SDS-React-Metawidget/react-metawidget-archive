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
  };

  clearWidgets = noop;
  buildNestedMetawidget = () => {};
  overriddenNodes = [];

  render() {
    const { config, toInspect } = this.props;
    const container = [];
    const pipeline = new metawidget.Pipeline(container);

    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = builderFactory(toInspect);
    pipeline.widgetProcessors = [populateProcessor(toInspect), addIdProcessor(toInspect)];
    pipeline.layout = layoutWidget;
    pipeline.configure(config);
    const inspected = pipeline.inspect(toInspect);
    pipeline.buildWidgets(inspected, this);

    return (
      <div>{container}</div>
    );
  }
}
