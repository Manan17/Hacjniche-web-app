import React from 'react';
import './faq.css';
import ReactDOM from 'react-dom';

// here
class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this);
      const height = el.querySelector('.panel__inner').scrollHeight;
      this.setState({
        height
      });
    }, 400);
  }

  render() {
    const { label, content, activeTab, index, activateTab } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: `${isActive ? height : 0}px`
    };

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }} >
            {label}
          </div>
        </button >
        <div
          className="panel__inner"
          style={innerStyle}
          aria-hidden={!isActive}
        >
          <p className="panel__content">{content}</p>
        </div>
      </div >
    );
  }
}

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 100
    };

    this.activateTab = this.activateTab.bind(this);
  }

  activateTab(index) {
    this.setState(prev => ({
      activeTab: prev.activeTab === index ? -1 : index
    }));
  }

  render() {
    const { panels } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="accordion" role="tablist">
        {panels.map((panel, index) => (
          <Panel
            key={index}
            activeTab={activeTab}
            index={index}
            {...panel}
            activateTab={this.activateTab.bind(null, index)}
          />
        ))}
      </div>
    );
  }
}

export { Accordion };
