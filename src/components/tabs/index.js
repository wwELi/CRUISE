
import React, { useState, useMemo } from 'react';

import './index.less';

export default function Tabs(props) {

  const { onTabChange, tabs, defaultKey } = props;
  const [active, setActive] = useState(defaultKey);

  useMemo(() => onTabChange(active), [active]);

  return (
    <div className={'cm-tabs'}>
      {
        useMemo(() => tabs
          .map(tab =>
            <span className={active === tab.key ? 'tab-choose' : ''}
                  onClick={() => setActive(tab.key)}
                  key={tab.key}
            >{tab.name}</span>
          ), [active])
      }
    </div>
  )
}
