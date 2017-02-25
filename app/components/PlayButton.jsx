import React from 'react';
import classnames from 'classnames';

class PlayButton extends React.Component {
  static get propTypes() {
    return {
      className: React.PropTypes.string,
      active: React.PropTypes.bool,
      onClick: React.PropTypes.func.isRequired
    };
  }

  static get defaultProps() {
    return {
      active: false
    };
  }

  render() {
    const pause = `${String.fromCharCode(10073)}${String.fromCharCode(10073)}`;
    const play = String.fromCharCode(9658);

    const buttonClasses = classnames({
      'btn btn-default btn-xs': true,
      [this.props.className]: !!this.props.className
    });

    return (
      <button
        className={buttonClasses}
        onClick={this.props.onClick}
      >
        { this.props.active ? pause : play }
      </button>
    );
  }
}

export default PlayButton;
