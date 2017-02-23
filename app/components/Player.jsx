import React from 'react';

class Player extends React.Component {
  static get propTypes() {
    return {
      onChange: React.PropTypes.func,
      isRunning: React.PropTypes.bool,
      value: React.PropTypes.number,
      max: React.PropTypes.number,
      speed: React.PropTypes.number,
      children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
      ])
    };
  }

  static get defaultProps() {
    return {
      onChange: () => {},
      isRunning: false,
      value: 0,
      speed: 1000,
      max: 10
    };
  }

  constructor(props) {
    super(props);
    const state = {
      isRunning: props.isRunning,
      currentFrame: props.value
    };

    this.state = state;
    this.initialState = Object.assign({}, state);
  }

  componentDidMount() {
    this.togglePlayer();
  }

  componentWillUnmount() {
    this.clearInterval();
    this.state = this.initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isRunning !== nextProps.isRunning) {
      this.setState({
        isRunning: nextProps.isRunning
      }, () => this.togglePlayer());
    }
  }

  getCurrentFrame() {
    return this.state.currentFrame;
  }

  getNextFrame() {
    return (this.state.currentFrame + 1) % this.props.max;
  }

  reset() {
    this.clearInterval();
    this.setState(this.initialState);
  }

  togglePlayer() {
    this.clearInterval();

    if (this.state.isRunning) {
      this.startInterval();
    }
  }

  startInterval() {
    this.interval = setInterval(() => this.update(), this.props.speed);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  update() {
    this.setState({
      currentFrame: this.getNextFrame()
    });

    this.props.onChange(this.state.currentFrame);
  }

  render() {
    return (
      <div className="player-container">
        {this.props.children}
      </div>
    );
  }
}

export default Player;
