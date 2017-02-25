import React from 'react';
import PlayButton from './PlayButton.jsx';

export default class AnimatedPanel extends React.Component {
  static get defaultProps() {
    return {
      isRunning: false,
      onClick: () => {}
    };
  }

  static get propTypes() {
    return {
      isRunning: React.PropTypes.bool,
      onClick: React.PropTypes.func,
      children: React.PropTypes.array.isRequired
    };
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <PlayButton
              className="play-button"
              active={this.props.isRunning}
              onClick={this.props.onClick}
            />
            <span className="title-label">&nbsp;Live validator</span>
          </div>
        </div>
        <div className="panel-body no-padding">
          {this.props.children}
        </div>
      </div>
    );
  }
}
