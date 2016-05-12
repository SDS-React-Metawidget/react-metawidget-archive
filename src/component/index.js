import React, { Component, PropTypes } from 'react';


export default class Metawidget extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    toInspect: PropTypes.object,
    config: PropTypes.object,
  };

  render() {
    return (
      <div />
    );
  }
}
