import React, { useState, useMemo, useEffect } from 'react';

import findInTree from '@utils/find';

import './index.less';
import SubMenu from './submenu';

export default function Menus({ menus, defaultKey, extra }) {

  const [show, setShow] = useState(null);
  const classes = ['cm-menus'];

  Menus.open = () => setShow(true);
  Menus.close = () => setShow(false);

  if (show !== null) {
    classes.push(show ? 'cm-left-in' : 'cm-left-out');
  }

  const left = 0;
  const [activeKey, updateKeyAction] = useState(defaultKey);
  const propsMenu = { active: activeKey, updateKeyAction, left };

  useEffect(() => {
    const node = findInTree(menus, ({ key }) => key === defaultKey);
    if (node) {
      location.hash = `#${node.link}`;
    }

  }, [menus]);

  return (
    <section className={classes.join(' ')}>
      <div>
        {
          <div className="cm-menus-close"><i onClick={Menus.close} className="icon-close"></i></div>
        }
        {
          useMemo(() => menus.map((node, index) => <SubMenu {...propsMenu} key={index} node={node}/>), [menus, activeKey])
        }
      </div>
      <div className="cm-menus-extra">
        {
          extra
        }
      </div>
    </section>
  )
}

