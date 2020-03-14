
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_LEFT = 10;

export default function SubMenu(props) {

  const { node, left, active, updateKeyAction } = props;
  const { name, link, children, key, icon } = node;

  const _left = left + DEFAULT_LEFT;
  const classes = ['cm-submenu-title'];
  const propsMenu = { active, updateKeyAction, left: _left };
  const hasChild = Array.isArray(children) && children.length > 0;

  if (key === active) classes.push('cm-menu-choosed');

  function Child() {

    const [show, setShow] = useState(node.show);
    useEffect(() => (node.show = show, undefined), [show]);

    return (
      <>
        <div className="cm-submenu-title" onClick={() => setShow(!show)}>
          <a style={{ paddingLeft: `${_left}px` }}>{name}</a>
          <i className="icon-angle-down" />
        </div>

        {
          show &&
          children.map((item, index) => <SubMenu {...propsMenu} key={index} node={item}/>)
        }
      </>
    )
  }

  return (
    <div className="cm-submenus">
      {
        hasChild
          ? <Child />
          : <Link
              className={classes.join(' ')}
              onClick={() => updateKeyAction(key)}
              to={link} style={{ paddingLeft: `${_left}px` }}
            >
                <span><i className={`icon-${icon}`} />{name}</span>
            </Link>
      }
    </div>
  )
}
