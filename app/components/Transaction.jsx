import React, { Component } from 'react';
import classnames from 'classnames';

export default class Transaction extends React.Component {
  static get defaultProps() {
    return {
      data: {}
    };
  }

  static get propTypes() {
    return {
      current: React.PropTypes.bool,
      unbalanced: React.PropTypes.bool,
      duplicate: React.PropTypes.bool,
      data: React.PropTypes.object
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const data = props.data;

    const balanceClasses = classnames({
      unbalanced: props.unbalanced
    });

    const refClasses = classnames({
      'well well-sm': true,
      'duplicates': props.duplicate
    });

    const rowClasses = classnames({
      transaction: true,
      selected: props.current,
      warning: (props.current && props.duplicate) || (props.current && props.unbalanced)
    });

    return (
      <div className={rowClasses}>
        <div className="sub">
          <label className={refClasses}>{data.reference}</label>
        </div>
        <div className="sub">
          <span>{data.description}</span>

          <div>
            <span>{data.accountNumber}</span>
            <span>-</span>
              <span>{data.startBalance}</span>
              <span>{data.mutation}</span>
              <span className={balanceClasses}>{data.endBalance}</span>
          </div>
        </div>
      </div>
    );
  }
}
