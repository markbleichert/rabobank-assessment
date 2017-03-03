import React, { Component } from 'react';

import Tabs from './Tabs.jsx';
import Player from './Player.jsx';
import RadioGroup from './RadioGroup.jsx';
import Transaction from './Transaction.jsx';
import AnimatedPanel from './AnimatedPanel.jsx';

import Actions from '../flux/Actions.js';

import '../styles/main.less';

class App extends Component {
  constructor(props) {
    super(props);

    const state = {
      data: [],
      ticker: 0,
      isRunning: false
    };

    // setup initial state
    this.state = state;
    this.initialState = Object.assign({}, state);

    // bind all event handlers
    this.onTabSelect = this.onTabSelect.bind(this);
    this.onNextTick = this.onNextTick.bind(this);
    this.onSortPropertyChange = this.onSortPropertyChange.bind(this);
    this.onTogglePlayer = this.onTogglePlayer.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
  }

  static get propTypes() {
    return {
      datastore: React.PropTypes.object.isRequired
    };
  }

  onDataChange() {
    this.setState({
      data: this.props.datastore.getList(),
    });
  }

  componentWillMount() {
    this.props.datastore.addChangeListener(this.onDataChange);
  }

  componentWillUnmount() {
    this.props.datastore.removeChangeListener(this.onDataChange);
  }

  componentDidMount() {
    // load initial data for first tab
    Actions.fetchData();
  }

  onTabSelect(tab) {
    const map = {
      xmlPanel: 'xml',
      csvPanel: 'csv',
      allPanel: 'all'
    };

    if (tab.id in map) {
      const type = map[tab.id];
      Actions.fetchData(type);
    } else {
      console.warn('unable to finde appropriate data type.');
    }
  }

  onNextTick(index) {
    this.setState({
      ticker: index
    });
  }

  onSortPropertyChange(value) {
    Actions.sortData(value);
  }

  onTogglePlayer() {
    this.setState({
      isRunning: !this.state.isRunning
    });
  }

  renderAlert() {
    // eslint-disable-next-line array-callback-return
    return this.state.data.map((item, index) => {
      if (this.props.datastore.hasInvalidProps(item.reference)) {
        const props = this.props.datastore.getInvalidProps(item.reference).toString();
        return (
          <div key={index} className="alert alert-dismissible alert-warning">
            <strong>Oh snap !&nbsp;</strong>
            {`Reference ${item.reference} has '${props}' property missing..`}
          </div>
        );
      }
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>{this.state.error.stack}</div>
      );
    }

    return (
      <div className="app container">
        <Tabs activeTab={0} onTabSelect={this.onTabSelect}>
          <Tabs.Panel id="xmlPanel" title="Load XML">
            <div>
              { this.renderAlert() }
              <RadioGroup
                label="Sort by"
                onChange={this.onSortPropertyChange}
                options={[
                  { value: 'accountNumber', label: 'Accountnumber' },
                  { value: 'reference', label: 'Reference' }
                ]}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel id="csvPanel" title="Load CSV">
            <RadioGroup
              label="Sort by"
              onChange={this.onSortPropertyChange}
              options={[
                { value: 'accountNumber', label: 'Accountnumber' },
                { value: 'reference', label: 'Reference' },
                { value: 'endBalance', label: 'Balance' }
              ]}
            />
          </Tabs.Panel>
          <Tabs.Panel id="allPanel" title="Load All">
            <RadioGroup
              label="Sort by"
              onChange={this.onSortPropertyChange}
              options={[
                { value: 'accountNumber', label: 'Accountnumber' },
                { value: 'reference', label: 'Reference' }
              ]}
            />
          </Tabs.Panel>
        </Tabs>

        <Player
          isRunning={this.state.isRunning}
          onChange={this.onNextTick}
          max={this.state.data.length}
        >

          <AnimatedPanel
            isRunning={this.state.isRunning}
            onClick={this.onTogglePlayer}
          >
            { this.state.data.map((item, index) => {
              return (
                <div key={index}>
                  <Transaction
                    data={item}
                    current={this.state.isRunning && (this.state.ticker === index)}
                    duplicate={this.props.datastore.isDuplicate(item.reference)}
                    unbalanced={!this.props.datastore.isBalanced(item.reference)}
                  />
                </div>
              );
            })
           }
          </AnimatedPanel>
        </Player>
      </div>
    );
  }
}

export default App;
