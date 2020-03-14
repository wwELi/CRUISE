
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tabs from '../index';

Enzyme.configure({ adapter: new Adapter() });

const tabs = [
  { key: 'all', name: 'All' },
  { key: 'virtual', name: 'Virtual' },
  { key: 'physical', name: 'Physical' }
];


describe('tabs', () => {
  it('renders', () => {

    const onChangeMock = () => {};


    const tree = renderer
      .create(<Tabs tabs={tabs} onTabChange={onChangeMock}>hello</Tabs>)
      .toJSON();
    expect(tree).toMatchSnapshot();

  });

  describe('onChange', () => {

    let wrapper;
    let handle;

    beforeEach(() => {
      handle = jest.fn();
      wrapper = mount(
        <Tabs tabs={tabs} onTabChange={() => {}}>hello</Tabs>,
      );
    });

    it('choose length', () => {

      const wrapper = render(<Tabs tabs={tabs} defaultKey={'all'} onTabChange={() => {}}>hello</Tabs>);

      expect(wrapper.find('.tab-choose').length).toBe(1);
    })

  })

});

