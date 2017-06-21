import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { PickerKeyboardShortcutsPhrases } from '../../src/defaultPhrases';
import CloseButton from '../../src/svg/close.svg';

import PickerKeyboardShortcuts, { KeyboardShortcutRow } from '../../src/components/PickerKeyboardShortcuts';

describe('KeyboardShortcutRow', () => {
  it('is a .KeyboardShortcutRow', () => {
    const wrapper = shallow(
      <KeyboardShortcutRow
        unicode="foo"
        label="bar"
        action="baz"
      />,
    );
    expect(wrapper.is('.KeyboardShortcutRow')).to.equal(true);
  });

  it('is an li', () => {
    const wrapper = shallow(
      <KeyboardShortcutRow
        unicode="foo"
        label="bar"
        action="baz"
      />,
    );
    expect(wrapper.is('li')).to.equal(true);
  });

  describe('.KeyboardShortcutRow__key-container', () => {
    it('is rendered', () => {
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action="baz"
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__key-container')).to.have.lengthOf(1);
    });

    describe('.KeyboardShortcutRow__key', () => {
      it('is rendered', () => {
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode="foo"
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key')).to.have.lengthOf(1);
      });

      it('has role=`img`', () => {
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode="foo"
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key').props().role).to.equal('img');
      });

      it('has props.unicode as child', () => {
        const unicode = 'UNICODE';
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode={unicode}
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key').text()).to.equal(unicode);
      });
    });
  });

  describe('.KeyboardShortcutRow__action', () => {
    it('is rendered', () => {
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action="baz"
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__action')).to.have.lengthOf(1);
    });

    it('contains props.action as child', () => {
      const action = 'ACTION';
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action={action}
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__action').text()).to.equal(action);
    });
  });
});

describe('PickerKeyboardShortcuts', () => {
  describe('#render', () => {
    describe('.PickerKeyboardShortcuts__show', () => {
      it('is rendered', () => {
        const wrapper = shallow(<PickerKeyboardShortcuts />);
        expect(wrapper.find('.PickerKeyboardShortcuts__show')).to.have.lengthOf(1);
      });

      it('is a button', () => {
        const wrapper = shallow(<PickerKeyboardShortcuts />);
        expect(wrapper.find('.PickerKeyboardShortcuts__show').is('button')).to.equal(true);
      });

      it('contains .PickerKeyboardShortcuts__show_span', () => {
        const wrapper = shallow(<PickerKeyboardShortcuts />);
        const buttonWrapper = wrapper.find('.PickerKeyboardShortcuts__show');
        expect(buttonWrapper.find('.PickerKeyboardShortcuts__show_span')).to.have.lengthOf(1);
      });

      it('click calls props.openKeyboardShortcutsPanel', () => {
        const openKeyboardShortcutsPanelStub = sinon.stub();
        const wrapper = shallow(
          <PickerKeyboardShortcuts
            openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
          />,
        );
        const buttonWrapper = wrapper.find('.PickerKeyboardShortcuts__show');
        buttonWrapper.simulate('click');
        expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
      });
    });

    describe('.PickerKeyboardShortcuts__panel', () => {
      it('is not rendered if props.showKeyboardShortcutsPanel is falsey', () => {
        const wrapper = shallow(
          <PickerKeyboardShortcuts
            showKeyboardShortcutsPanel={false}
          />,
        );
        expect(wrapper.find('.PickerKeyboardShortcuts__panel')).to.have.lengthOf(0);
      });

      it('is rendered if props.showKeyboardShortcutsPanel is truthy', () => {
        const wrapper = shallow(
          <PickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.PickerKeyboardShortcuts__panel')).to.have.lengthOf(1);
      });

      it('has role of dialog', () => {
        const wrapper = shallow(
          <PickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.PickerKeyboardShortcuts__panel').props().role).to.equal('dialog');
      });

      describe('.PickerKeyboardShortcuts__title', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__title')).to.have.lengthOf(1);
        });

        it('has props.phrases.keyboardShortcuts as a child', () => {
          const keyboardShortcuts = 'FOOBARBAZ';
          const phrases = { ...PickerKeyboardShortcutsPhrases, keyboardShortcuts };
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              phrases={phrases}
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__title').text()).to.equal(keyboardShortcuts);
        });
      });

      describe('.PickerKeyboardShortcuts__close', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__close')).to.have.lengthOf(1);
        });

        it('is a button', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__close').is('button')).to.equal(true);
        });

        it('renders a CloseButton', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__close').find(CloseButton)).to.have.lengthOf(1);
        });

        it('calls props.closeKeyboardShortcutsPanel if clicked', () => {
          const closeKeyboardShortcutsPanelStub = sinon.stub();
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanelStub}
            />,
          );
          const closeButton = wrapper.find('.PickerKeyboardShortcuts__close');
          closeButton.simulate('click');
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
      });

      describe('.PickerKeyboardShortcuts__list', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__list')).to.have.lengthOf(1);
        });

        it('is a ul', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__list').is('ul')).to.equal(true);
        });

        it('renders 7 KeyboardShortcutRow components', () => {
          const wrapper = shallow(
            <PickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.PickerKeyboardShortcuts__list').find(KeyboardShortcutRow)).to.have.lengthOf(7);
        });
      });
    });
  });
});
