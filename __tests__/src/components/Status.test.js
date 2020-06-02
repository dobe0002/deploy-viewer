// https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c322583

/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Status from '../../../src/components/Status';
import Sun from '../../../src/components/icons/Sun';
import DarkClouds from '../../../src/components/icons/DarkClouds';
import Rain from '../../../src/components/icons/Rain';
import Thunder from '../../../src/components/icons/Thunder';
import Question from '../../../src/components/icons/Question';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Status component tests', () => {
  const sampleProps = {
    id: 'myStatus',
    code: 'C',
    description: 'This is my status',
    appTitle: 'My application',
    dateString: '10/05/2019',
    note: 'This is a note',
    icon: false,
    tableCell: false,
    popOver: false
  };
  beforeEach(() => {});

  test('Accessibility check - icon', async () => {
    const div = document.createElement('div');
    div.id = 'icon';
    document.body.appendChild(div);
    const wrapper = mount(
      <Status
        icon
        code={sampleProps.code}
        id='icon'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div }
    );
    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });

  test('Accessibility check - icon with popover', async () => {
    const div2 = document.createElement('div');
    div2.id = 'iconPopover2';
    document.body.appendChild(div2);
    const wrapper = mount(
      <Status
        icon
        popOver
        code={sampleProps.code}
        id='iconPopover'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div2 }
    );
    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });

  test('Accessibility check - table cell without popover', async () => {
    const tr3 = document.createElement('tr');
    tr3.id = 'tablePopover';
    document.body.appendChild(tr3);
    const wrapper = mount(
      <Status
        tableCell
        code={sampleProps.code}
        id='tablePopover'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: tr3 }
    );
    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });

  test('Accessibility check - table cell with popover', async () => {
    const tr4 = document.createElement('tr');
    tr4.id = 'tablePopover4';
    document.body.appendChild(tr4);
    const wrapper = mount(
      <Status
        tableCell
        popOver
        code={sampleProps.code}
        id='tablePopover5'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: tr4 }
    );
    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });
  test('Accessibility check - plain text', async () => {
    const div7 = document.createElement('div');
    div7.id = 'icon7';
    document.body.appendChild(div7);
    const wrapper = mount(
      <Status
        code={sampleProps.code}
        id='icon8'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div7 }
    );
    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });

  test('Check icon - G', () => {
    const wrapper = shallow(Status.icon('G'));
    const icon = shallow(<Sun color={Status.color('G')} />);
    expect(wrapper).toEqual(icon);
  });

  test('Check icon - O', async () => {
    const wrapper = await shallow(Status.icon('O'));
    const icon = await shallow(<DarkClouds color={Status.color('O')} />);
    expect(wrapper).toEqual(icon);
  });

  test('Check icon - B', () => {
    const wrapper = shallow(Status.icon('B'));
    const icon = shallow(<Rain color={Status.color('B')} />);
    expect(wrapper).toEqual(icon);
  });
  test('Check icon - C', () => {
    const wrapper = shallow(Status.icon('C'));
    const icon = shallow(<Thunder color={Status.color('C')} />);
    expect(wrapper).toEqual(icon);
  });
  test('Check icon - no status sent', () => {
    const wrapper = shallow(Status.icon(''));
    const icon = shallow(<Question color={Status.color('')} />);
    expect(wrapper).toEqual(icon);
  });

  test('Check color - G', () => {
    expect(Status.color('G')).toEqual('#38761d');
  });
  test('Check color - O', () => {
    expect(Status.color('O')).toEqual('#666');
  });
  test('Check color - B', () => {
    expect(Status.color('B')).toEqual('#ff6d01');
  });
  test('Check color - C', () => {
    expect(Status.color('C')).toEqual('#cc0000');
  });
  test('Check color - ""', () => {
    expect(Status.color('')).toEqual('#999');
  });

  test('Snapshot test icon', () => {
    const div = document.createElement('div');
    div.id = 'icon';
    document.body.appendChild(div);
    const wrapper = mount(
      <Status
        icon
        code={sampleProps.code}
        id='icon'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div }
    );
    expect(wrapper.find('Popover')).toHaveLength(0);
    expect(wrapper.find('td')).toHaveLength(0);
    expect(wrapper.find('Thunder')).toHaveLength(1);
    expect(wrapper.find('.codeSpan')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('Snapshot test icon with popover', () => {
    const div2 = document.createElement('div');
    div2.id = 'iconPopover2';
    document.body.appendChild(div2);
    const wrapper = mount(
      <Status
        icon
        popOver
        code={sampleProps.code}
        id='iconPopover'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div2 }
    );
    expect(wrapper.find('Popover')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(0);
    expect(wrapper.find('Thunder')).toHaveLength(1);
    expect(wrapper.find('.codeSpan')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('Snapshot test cell', () => {
    const tr3 = document.createElement('tr');
    tr3.id = 'tablePopover';
    document.body.appendChild(tr3);
    const wrapper = mount(
      <Status
        tableCell
        code={sampleProps.code}
        id='tablePopover'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: tr3 }
    );
    expect(wrapper.find('Popover')).toHaveLength(0);
    expect(wrapper.find('td')).toHaveLength(1);
    expect(wrapper.find('Thunder')).toHaveLength(0);
    expect(wrapper.find('.codeSpan')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('Snapshot test cell with popover', () => {
    const tr4 = document.createElement('tr');
    tr4.id = 'tablePopover4';
    document.body.appendChild(tr4);
    const wrapper = mount(
      <Status
        tableCell
        popOver
        code={sampleProps.code}
        id='tablePopover5'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: tr4 }
    );
    expect(wrapper.find('Popover')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(1);
    expect(wrapper.find('Thunder')).toHaveLength(0);
    expect(wrapper.find('.codeSpan')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('Snapshot test plain text', () => {
    const div7 = document.createElement('div');
    div7.id = 'icon7';
    document.body.appendChild(div7);
    const wrapper = mount(
      <Status
        code={sampleProps.code}
        id='icon8'
        description={sampleProps.description}
        appTitle={sampleProps.appTitle}
        dateString={sampleProps.dateString}
        note={sampleProps.note}
      />,
      { attachTo: div7 }
    );
    expect(wrapper.find('Popover')).toHaveLength(0);
    expect(wrapper.find('td')).toHaveLength(0);
    expect(wrapper.find('Thunder')).toHaveLength(0);
    expect(wrapper.find('.codeSpan')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
