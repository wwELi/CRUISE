
import React from 'react';

import './popover.less';
import Popup from './index';


export default function Popover(props) {

  const { content, children, onClose, visible, okText, cancelText, onOk, ...other } = props;

  function Component() {
    return (
      <div className="content" {...other}>
        <i onClick={onClose} className="icon-close"></i>
        <div className="content-board">{ content }</div>
        <div>
          <button onClick={onOk} className="ok-popover">{okText || '确认'}</button>
          <button onClick={onClose} className="cancel-popover">{cancelText || '取消'}</button>
        </div>
      </div>
    )
  }

  return (
    <Popup visible={visible} onClose={onClose} content={<div className="cm-popover"><Component/></div>}>
      { children }
    </Popup>
  )

}
