import React, { Component } from 'react';

import xml from '../data/records.xml';
import csv from '../data/records.csv';

import classnames from 'classnames';

import Validator from './validator.js';
import parser from './parser.js';
import Tabs from './Tabs.jsx';
import Player from './Player.jsx';
import RadioGroup from './RadioGroup.jsx';
import Transaction from './Transaction.jsx';
import AnimatedPanel from './AnimatedPanel.jsx';

import '../styles/main.less';

class App extends Component {
  constructor(props) {
    super(props);

    const state = {
      data: [],
      ticker: 0,
      isRunning: false
    };

    this.state = state;
    this.initialState = Object.assign({}, state);

    this.handleLoadCsv = this.handleLoadCsv.bind(this);
    this.handleLoadXml = this.handleLoadXml.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
    this.onNextTick = this.onNextTick.bind(this);
    this.onSortPropertyChange = this.onSortPropertyChange.bind(this);
    this.onTogglePlayer = this.onTogglePlayer.bind(this);
  }

  componentDidMount() {
    this.handleLoadXml();
  }

  handleLoadXml(e) {
    parser.parseXml(xml, (err, data) => {
      this.validator = new Validator(data);
      this.validator.run();
      this.setState({
        data
      });
    });
  }

  handleLoadCsv(e) {
    const data = parser.parseCsv(csv);
    this.validator = new Validator(data);
    this.validator.run();

    this.setState({
      data
    });
  }

  onTabSelect(tab) {
    switch(tab.id) {
      case 'xmlPanel':
        this.handleLoadXml();
        break;
      case 'csvPanel':
        this.handleLoadCsv();
        break;
      default:
        // do nothing ?
    }
  }

  renderAlert() {
    return this.state.data.map((item, index) => {
      // validate properties against expected schema
      var props = this.validator.hasInvalidProps(item.reference);
      if (props && props.length > 0) {
        return (
          <div key={index} className="alert alert-dismissible alert-warning">
            <strong>Oh snap ! </strong>
            {`Reference ${item.reference} has '${props.toString()}' property missing..`}
          </div>
        );
      }
    });
  }

  onNextTick(index) {
    this.setState({
      ticker: index
    })
  }

  onSortPropertyChange(value) {
    const fnc = parser.sortBy(value, false);
    var newArray = this.state.data.sort(fnc);

    this.setState({
      data: newArray
    });
  }

  onTogglePlayer() {
    this.setState({
      isRunning: !this.state.isRunning
    });
  }

  render() {
    const validator = this.validator;

    return (
      <div className="app container">
        <Tabs activeTab={0} onTabSelect={this.onTabSelect}>
          <Tabs.Panel id="xmlPanel" title="Load XML">
            <div>
              <span>{this.renderAlert()}</span>
              <RadioGroup
                label="Sort by"
                onChange={this.onSortPropertyChange}
                options={[
                  {value: 'accountNumber', label: 'Accountnumber'},
                  {value: 'reference', label: 'Reference'}
                ]}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel id="csvPanel" title="Load CSV">
            <RadioGroup
              label="Sort by"
              onChange={this.onSortPropertyChange}
              options={[
                {value: 'accountNumber', label: 'Accountnumber'},
                {value: 'reference', label: 'Reference'},
                {value: 'endBalance', label: 'Balance'}
              ]}
            />
          </Tabs.Panel>
        </Tabs>

        <Player
          isRunning={this.state.isRunning}
          onChange={this.onNextTick}
          max={this.state.data.length}>

          <AnimatedPanel
            isRunning={this.state.isRunning}
            onClick={this.onTogglePlayer}
          >
            { this.state.data.map((item, index) => {

              // current record flag should be false when in 'static list' mode
              // or else first record will be selected. We do not want that !
              // when 'live' iterating through list this flag is important to
              // determine active record.
              const isCurrent = this.state.isRunning && (this.state.ticker === index);
              const isDuplicate = validator.isDuplicate(item.reference);
              const isUnbalanced = !validator.isBalanced(item.reference);

              return (
                <div key={index}>
                  <Transaction
                    data={item}
                    current={isCurrent}
                    duplicate={isDuplicate}
                    unbalanced={isUnbalanced}
                  />
                </div>
              )
            })
           }
          </AnimatedPanel>
        </Player>
      </div>

    );
  }
}

export default App;
