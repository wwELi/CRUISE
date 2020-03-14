
import React from 'react';

export default function Statistics({ statistics }) {

  return (
    <div className="md-agent-total">

      <div className="building">
        <i className="icon-cog" />
        <span className="status-name">Building</span>
        <span className="status-count">{ statistics.status.building }</span>
      </div>

      <div className="idle">
        <i className="icon-coffee" />
        <span className="status-name">Idle</span>
        <span className="status-count">{ statistics.status.idle }</span>
      </div>

      <div className="type-all">
        <div>
          <div className="type-all-name">ALL</div>
          <div className="type-all-count">{ (statistics.type.virtual || 0) + (statistics.type.physical || 0) }</div>
        </div>
        <div>
          <div className="type-all-name">VIRTUAL</div>
          <div className="type-all-count">{ statistics.type.virtual }</div>
        </div>
        <div>
          <div className="type-all-name">PHYSICAL</div>
          <div className="type-all-count">{ statistics.type.physical }</div>
        </div>
      </div>
    </div>
  )
}
