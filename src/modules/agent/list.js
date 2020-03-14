
import React, { useState, useMemo, useRef } from 'react';

import { Popover, Modal } from '@components';
import { agentsResource } from '../../resource';

import './list.less';
import { OS_ICON_PATH, STATUS_COLORS } from './constant';

export default function List(props) {

  const { list } = props;

  return (
    <ul className="agent-list">
      {
        list.map(item => <Item key={item.id} resource={item}/>)
      }
    </ul>
  )
}

function Item({resource}) {

  const { name, status, ip, location, resources, id, os } = resource;
  const [, faceUpdate] = useState();
  const addResource = (value, onClose) => {
    if (!value) return;

    const body = {...resource, resources: [...resources, value] };
    agentsResource
      .update({ id }, body)
      .then(() => {
        onClose();
        resources.push(value);
        faceUpdate(Symbol());
      });
  };

  const Popup = PopupHoc(<i className="icon-plus plus" />);

  return (
    <li>
      <img className="agent-os-icon" src={OS_ICON_PATH[os]}/>
      <div className="line" style={{color:STATUS_COLORS[status]}}/>
      <div className="agent-list-context">
        <div className="resource-info">
          <span><i className="icon-desktop"/><span className="resource-name">{name}</span></span>
          <span className="status" style={{backgroundColor: STATUS_COLORS[status]}}>{status}</span>
          <span className="ip"><i className="icon-info"/>{ip}</span>
          <span className="location"><i className="icon-folder"/>{location}</span>
        </div>
        <div className="resource-operator">
          <Popup onOk={addResource} />
          <span className="operator">
            {
              resources.map((resource, index) => <span key={index}>{resource}<i className="icon-trash"></i></span>)
            }
          </span>
          {
            status === 'building' &&
            <span className="deny">
              <span className="deny-btn"><i className="icon-deny"/>Deny</span>
            </span>
          }
        </div>
      </div>
    </li>
  )
}

function PopupHoc(Component) {

  const popProps = { okText: 'Add Resources', cancelText: 'Cancel' };
  const input = useMemo(() => ({ value: '' }), []);
  const onInputChange = value => input.value = value;

  const popContent = (
    <div className="content-popup">
      <span>Separate multiple resource name with commas</span>
      <input onChange={evt => onInputChange(evt.target.value)} />
    </div>
  );

  return function (props) {

    const { onOk } = props;

    function PopoverC() {

      const [visible, setVisible] = useState();
      const onOkAction = () => onOk(input.value, () => setVisible(false));
      const onCloseAction = () => {
        input.value = '';
        setVisible(false);
      };

      return (
        <Popover {...popProps}
                 visible={visible}
                 onOk={onOkAction} onClose={onCloseAction}
                 content={visible ? popContent : null}>
          {
            React.cloneElement(Component, { onClick: () => setVisible(true)})
          }
        </Popover>
      )
    }

    function ModalC() {

      const [visible, setVisible] = useState();
      const onOkAction = () => onOk(input.value, () => setVisible(false));
      const onCloseAction = () => {
        input.value = '';
        setVisible(false);
      };

      return (
        <Modal {...popProps}
               visible={visible}
               onOk={onOkAction} onClose={onCloseAction}
               content={visible ? popContent : null}>
          {
            React.cloneElement(Component, { onClick: () => setVisible(true)})
          }
        </Modal>
      )
    }

    return (
      <>
        <span className="modal-display"><ModalC /></span>
        <span className="popover-display"><PopoverC /></span>
      </>
    )
  }
}
