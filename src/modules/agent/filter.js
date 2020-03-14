
import React from 'react';

import { Tabs } from '@components'

import './filter.less';
import { TABS } from "./constant";

export default function Filter(props) {

  const { onTabChange, params } = props;

  return (
    <section className={'agent-filter'}>
      <Tabs tabs={TABS} defaultKey={params.tab} onTabChange={onTabChange}/>

      <div className='agent-filter-search'>
        <input /><i className="icon-search"/>
      </div>

      <div className="agent-filter-layout">
        <i className="icon-th-card"/>
        <i className="icon-th-list"/>
      </div>
    </section>
  )
}
