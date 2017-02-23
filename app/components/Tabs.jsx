import React from 'react';
import classNames from 'classnames';

import '../styles/tabs.less';

export default class Tabs extends React.Component {
  static get defaultProps() {
    return {
      activeTab: 0
    };
  }

  static get propTypes() {
    return {
      onTabPanelClick: React.PropTypes.func,
      onTabSelect: React.PropTypes.func,
      activeTab: React.PropTypes.number,
      children: React.PropTypes.array
    };
  }

  constructor(props) {
    super(props);
    
    const state = {
      activeTab: props.activeTab
    };

    this.state = state;
    this.initialState = Object.assign({}, state);

    this._renderedPanels = [];

    this.onTabPanelClick = this.onTabPanelClick.bind(this);
  }

  onTabPanelClick() {
    const index = this.state.activeTab;
    const child = this.props.children[index];

    const func = this.props.onTabPanelClick;
    if (typeof func === 'function') {
      func({
        index,
        id: child.props.id,
        title: child.props.title
      });
    }
  }

  setActive(index) {
    this.setState({
      activeTab: index
    });
    const child = this.props.children[index];

    const func = this.props.onTabSelect;

    if (typeof func === 'function') {
      func({
        index,
        id: child.props.id,
        title: child.props.title
      });
    }
  }

  renderActivePanel() {
    const rendered = this._renderedPanels;

    if (rendered.indexOf(this.state.activeTab) === -1) {
      rendered.push(this.state.activeTab);
    }

    const panels = this.props.children.map((panel, index) => {
      if (rendered.indexOf(index) === -1) {
        return null;
      }

      const classes = classNames({
        panelContainer: true,
        active: this.state.activeTab === index
      });

      return (
        <div key={index} className={classes}>
          {panel}
        </div>
      );
    });

    return (
      <div className="tabsPanel" onClick={this.onTabPanelClick}>
        {panels}
      </div>
    );
  }

  renderTabs() {
    const tabs = this.props.children.map((item, index) => {
      const classes = classNames({
        active: this.state.activeTab === (index)
      });

      return (
        <li key={index} className={classes}>
          <a onClick={() => this.setActive(index)}>
            {item.props.title}
          </a>
        </li>
      );
    });

    return (
      <ul className="nav nav-tabs">
        {tabs}
      </ul>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this.renderTabs()}
        {this.renderActivePanel()}
      </div>
    );
  }
}

// create a child component
class Panel extends React.Component {
  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      children: React.PropTypes.object,
      disabled: React.PropTypes.bool
    }
  }

  render() {
    if (this.props.disabled) {
      return <div>Not available</div>;
    }
    return <div>{this.props.children}</div>;
  }
}


Tabs.Panel = Panel;
