import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import EntityListItem from '../pieces/EntityListItem.react';
// import { connect } from 'react-redux';

function EntityList({entities, entityScores}) {
  return (
    <div>
      <div className='row entity-categories'>
      <span className='eight columns'>Name</span>
      <span className='two columns'>Type</span>
      <span className='two columns'>Relevance</span>
      </div>
      <div className='entity-body'>
    {entities.map((entity, i) => <EntityListItem key={entity.id} entityScore={entityScores[i]} {...entity} />)}
      </div>
    </div>
    );
}

// EntityList.PropTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   header_image: PropTypes.string.isRequired,
//   basic_summary: PropTypes.array.isRequired,
// };

export default EntityList;