import React from 'react';

class RadioGroup extends React.Component {
  static get propTypes() {
    return {
      label: React.PropTypes.string,
      options: React.PropTypes.array
    }
  }

  static get defaultProps() {
    return {
      label: 'label',
      options: []
    };
  }

  constructor(props) {
    super(props);

    const state = {
      selectedOption: props.options[0].value
    };

    this.state = state;
    this.initialState = Object.assign({}, state);

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(e) {
    const selectedOption = e.target.value;
    this.setState({
      selectedOption
    }, () => this.props.onChange(selectedOption));
  }

  renderOptions() {
    return this.props.options.map((option, index) => {
      return (
        <div key={index} className="radio">
          <label>
            <input
              type="radio" value={option.value}
              checked={this.state.selectedOption === option.value}
              onChange={this.handleOptionChange} />
            {option.label}
          </label>
        </div>
      );
    });
  }

  render() {
    return (
      <form className="radio-group">
        <label className="label label-success cheapspace">{this.props.label}</label>
        {this.renderOptions()}
      </form>
    )
  }
}

export default RadioGroup;
