
import React, { useEffect, useState, useMemo } from 'react';

import { agentsResource } from '../../resource';
import count from '@utils/count';

import './index.less'
import Statistics from './statistics';
import Filter from './filter';
import List from './list';

const ALL_KEY = 'all';

function Agent() {

  const [agents, setAgents] = useState([]);
  const [params, setParams] = useState({ tab: ALL_KEY, query: '' });
  const statistics = useMemo(() => count(agents, ['status', 'type']), [agents]);

  useEffect(() => {
    agentsResource.get().then(setAgents);
  }, []);

  const onTabChange = (key) => {
    setParams({ ...params, tab: key });
  };

  const list = useMemo(() => {
    return params.tab === ALL_KEY
      ? agents
      : agents.filter(({ type }) => type === params.tab)
  }, [agents, params]);

  return (
    <section className="md-agent">
      {
        useMemo(() => <Statistics statistics={statistics}/>, [statistics])
      }
      <Filter onTabChange={onTabChange} params={params}/>
      <List list={list}></List>
    </section>
  )
}

export default Agent;
