import React from 'react';

import './index.less';
import logo from '@assets/images/logo.svg';
import avatar from '@assets/images/avatar.jpg';

export default function Header({extra}) {
  return (
    <header className="cm-nav-header">
      <span className="cm-nav-extra">{extra}</span>
      <img src={logo} className='cm-header-logo'/>
      <span className="cm-header-profile">
        <img src={avatar} className='cm-header-avatar'/>
        <i className="icon-angle-down"></i>
      </span>
    </header>
  )
}
