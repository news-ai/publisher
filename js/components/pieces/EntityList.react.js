import React, { PropTypes } from 'react';
import EntityListItem from '../pieces/EntityListItem.react';
// import { connect } from 'react-redux';

function EntityList({entities, entityScores}) {
  return (
    <div>
      <div className='row entity-categories'>
      <span className='ten columns'>Name</span>
      <span className='two columns'>Relevance</span>
      </div>
      <div className='entity-body'>
    {entities.map((entity, i) => <EntityListItem key={entity.id} entityScore={entityScores[i]} {...entity} />)}
      </div>
    </div>
    );
}

EntityList.PropTypes = {
  entities: PropTypes.array.isRequired,
  entityScores: PropTypes.array.isRequired,
};

export default EntityList;
