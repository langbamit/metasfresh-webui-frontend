import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';

class QuickActionsDropdown extends Component {
  constructor(props) {
    super(props);
  }

  handleClickOutside = () => {
    const { handleClickOutside } = this.props;

    handleClickOutside();
  };

  componentDidMount() {
    document.getElementsByClassName('quick-actions-item')[0].focus();
  }

  handleKeyDown = (e, action) => {
    const { handleClick } = this.props;
    e.preventDefault();
    const next = document.activeElement.nextSibling;
    const prev = document.activeElement.previousSibling;
    switch (e.key) {
      case 'ArrowDown':
        if (!document.activeElement.classList.contains('quick-actions-item')) {
          document.getElementsByClassName('quick-actions-item')[0].focus();
        } else {
          if (next && next.classList.contains('quick-actions-item')) {
            next.focus();
          }
        }

        break;
      case 'ArrowUp':
        if (prev && prev.classList.contains('quick-actions-item')) {
          prev.focus();
        }
        break;
      case 'Enter':
        handleClick(action);
        break;
    }
  };

  handleItem = item => {
    document.getElementsByClassName('quick-actions-item')[item].focus();
  };

  render() {
    const { actions, handleClick } = this.props;

    return (
      <div className="quick-actions-dropdown">
        {actions.map((action, index) => (
          <div
            id={`quickAction_${
              action.internalName ? action.internalName : action.processId
            }`}
            tabIndex={0}
            ref={c => (this.item = c)}
            className={
              'quick-actions-item ' +
              (action.disabled ? 'quick-actions-item-disabled ' : '')
            }
            key={index}
            onClick={() => handleClick(action)}
            onKeyDown={e => this.handleKeyDown(e, action)}
            onMouseEnter={() => this.handleItem(index)}
          >
            {action.caption}
            {action.disabled && (
              <p className="one-line">
                <small>({action.disabledReason})</small>
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default connect()(onClickOutside(QuickActionsDropdown));
