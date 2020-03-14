
import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Popup from '../index.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Popup', () => {

  describe('clear', () => {

    let wrapper;
    let handle;
    let visible = true;

    beforeEach(() => {
      handle = jest.fn();
      wrapper = render(
        <Popup visible={visible} onClose={() => {}} content={<div>content</div>}><span>222</span></Popup>,
      );
    });

    it('popupMap size', () => {

      expect(Popup.popupMap.size).toBe(1);

    });

    it('popup clear', () => {
      Popup.close();
      expect(Popup.popupMap.size).toBe(0);
    });

    it('popup close', () => {
      const onClose = jest.fn();
      const wrapper = mount(
        <Popup visible={visible} onClose={onClose} content={<div>content</div>}><span>222</span></Popup>,
      );

      wrapper.setProps({ visible: false });
      Popup.close();
      expect(onClose).toHaveBeenCalled();
    })

  })

  describe('render', () => {

    let wrapper;
    let handle;
    let visible = true;

    beforeEach(() => {
      handle = jest.fn();
      wrapper = mount(
        <Popup visible={visible} onClose={() => {}} content={<div>content</div>}><span>222</span></Popup>,
      );
    });

    it ('content position', () => {

      expect(wrapper.find('section').first().props().style.position).toBe('absolute');
      expect(wrapper.find('section').first().props().style.display).toBe('block');
    })
  })

});

