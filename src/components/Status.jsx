import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import map from 'lodash/map';
import Sun from './icons/Sun';
import Rain from './icons/Rain';
import Thunder from './icons/Thunder';
import DarkClouds from './icons/DarkClouds';
import Question from './icons/Question';
import Popover from './Popover';

export default class Status extends React.Component {
  static color(code) {
    switch (code) {
      case 'G':
        return '#38761d';
      case 'O':
        return '#666';
      case 'B':
        return '#ff6d01';
      case 'C':
        return '#cc0000';
      case 'M':
        return '#3f1898';
      default:
        return '#999';
    }
  }

  static icon(code) {
    switch (code) {
      case 'G':
        return <Sun color={this.color(code)} />;
      case 'O':
        return <DarkClouds color={this.color(code)} />;

      case 'B':
        return <Rain color={this.color(code)} />;

      case 'C':
        return <Thunder color={this.color(code)} />;

      default:
        return <Question color={this.color(code)} />;
    }
  }

  static popOverBodyText(appTitle, dateString, note, status = '', code = '') {
    const Label = styled.span`
      display: inline-block;
      padding-right: 10px;
      font-weight: bold;
      &:after {
        content: ':';
      }
    `;
    const UL = styled.ul`
      list-style: none;
      padding-left: 0;
    `;

    return (
      <div>
        {status !== '' && (
          <p>
            {Status.icon(code)}
            <span> </span>
            {status}
          </p>
        )}
        <UL>
          <li>
            <Label>App</Label>
            {appTitle}
          </li>
          <li>
            <Label>Date</Label>
            {dateString}
          </li>
        </UL>
        {note !== '' && (
          <div>
            <hr />
            {note}
          </div>
        )}
      </div>
    );
  }

  popOverTitle(code) {
    const { description, statuses } = this.props;
    if (statuses.length === 0) {
      return (
        <div>
          {Status.icon(code)}
          <span style={{ width: '10px', display: 'inline-block' }} />
          {description}
        </div>
      );
    }

    return <div>Multiple deployments</div>;
  }

  popOverBody() {
    const { appTitle, dateString, note, statuses } = this.props;
    if (statuses.length === 0) {
      return Status.popOverBodyText(appTitle, dateString, note);
    }

    return map(statuses, (status, i) => {
      return (
        <div>
          {i !== 0 && (
            <div
              style={{
                borderTop: '2px solid #000',
                marginTop: '15px',
                marginBottom: '15px'
              }}
            />
          )}

          {Status.popOverBodyText(
            appTitle,
            status.dateString,
            status.note,
            status.statusDescription,
            status.status
          )}
        </div>
      );
    });
  }

  text(code) {
    const { tableCell, popOver, id } = this.props;
    const textStyle = {
      backgroundColor: Status.color(code),
      color: '#fff'
    };
    if (code === 'B') {
      textStyle.color = '#000';
    }
    if (tableCell) {
      if (popOver) {
        textStyle.cursor = 'pointer';
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          <td style={textStyle} tabIndex='0' id={id}>
            {code}
            <Popover
              id={id}
              popOverTitle={this.popOverTitle(code)}
              body={this.popOverBody()}
            />
          </td>
        );
      }
      return <td style={textStyle}>{code}</td>;
    }
    return (
      <span style={textStyle} className='codeSpan'>
        {code}
      </span>
    );
  }

  render() {
    const { icon, popOver, id, code, description } = this.props;
    if (icon) {
      if (popOver) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          <span id={id} tabIndex='0' style={{ cursor: 'pointer' }}>
            {Status.icon(code)}
            <Popover
              id={id}
              popOverTitle={description}
              body={this.popOverBody()}
            />
          </span>
        );
      }
      return Status.icon(code);
    }
    return this.text(code);
  }
}

Status.propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.bool,
  tableCell: PropTypes.bool,
  appTitle: PropTypes.string,
  dateString: PropTypes.string.isRequired,
  note: PropTypes.string,
  popOver: PropTypes.bool,
  statuses: PropTypes.arrayOf
};
Status.defaultProps = {
  icon: false,
  description: '',
  tableCell: false,
  popOver: false,
  appTitle: '',
  note: '',
  code: '',
  statuses: []
};
