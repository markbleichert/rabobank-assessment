import React, { Component } from 'react';
import classnames from 'classnames';

import xml from '../data/records.xml';
import csv from '../data/records.csv';

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

  loadMergedData() {
		this.fetchAll()
  		.then((arr) => {
  			this.setState({data: arr})
  		})
  		.catch((error) => {
  			this.setState({error})
  		});
	}

  fetchAll() {
		var p1 = this.loadXML(xml);
		var p2 = this.loadCSV(csv);

		// merge the results of to promise calls
		return Promise.all([p1, p2]).then((results) => {
			return [].concat.apply([], results);
		});
	}


  loadCSV(data) {
    return new Promise((resolve, reject) => {
      try {
        const d = parser.parseCsv(data);
        resolve(d);
      } catch(e) {
        reject(e);
      }
    });
  }

  loadXML(data) {
    return new Promise((resolve, reject) => {
      parser.parseXml(data, (err, d) => {
        if (err) {
          reject(err);
        }
        resolve(d);
      })
    });
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
      case 'allPanel':
        this.loadMergedData();
        break;
      default:
        // do nothing ?
    }
  }

  renderAlert() {
    return this.state.data.map((item, index) => {
      // validate properties against expected schema
      // return array of invalid properties
      var hasProps = this.validator.hasInvalidProps(item.reference);

      if (hasProps) {
        const props = this.validator.getInvalidProps(item.reference).toString();
        // @todo move this into seperate component ?
        // Probably in a real life app showing multiple messages like this
        // would not be very good UX design.
        return (
          <div key={index} className="alert alert-dismissible alert-warning">
            <strong>Oh snap !&nbsp;</strong>
            {`Reference ${item.reference} has '${props}' property missing..`}
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
              {this.renderAlert()}
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
          <Tabs.Panel id="allPanel" title="Load All">
            <RadioGroup
              label="Sort by"
              onChange={this.onSortPropertyChange}
              options={[
                {value: 'accountNumber', label: 'Accountnumber'},
                {value: 'reference', label: 'Reference'}
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
