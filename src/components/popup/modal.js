
import React from 'react';

import './modal.less';
import Popup from './index';

export default function Modal(props) {

  const { content, children, onClose, visible, okText, cancelText, onOk } = props;

  const style = {
    display: visible ? 'block' : 'none'
  };

  const contentWarp = (
    <div className="cm-modal-content">
      <i onClick={onClose} className="icon-close"></i>
      <div>{ content }</div>
      <div className="modal-btn">
        <button onClick={onOk} className="ok-popover">{okText || '确认'}</button>
        <button onClick={onClose} className="cancel-popover">{cancelText || '取消'}</button>
      </div>
    </div>
  );

  return (
    <>
      { children }
      <div className="cm-modal" style={style}>
        <Popup content={contentWarp} onClose={onClose} visible={visible}>
          <span style={{display: 'none'}}></span>
        </Popup>
        <div className="mask" />
      </div>
    </>
  );
}

