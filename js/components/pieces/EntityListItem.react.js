import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function truncate(num, decimalPoint) {
  return Math.floor(num * 100 * (10 ** decimalPoint)) / (10 ** decimalPoint);
}

function EntityListItem({name, id, entityScore, toggleFollow, following}) {
  return (
    <Link to={'/entities/' + id}>
      <div className='row' style={{display: 'flex'}}>
        <div className='six columns'>
          <Link to={`/entities/${id}`}>
            <div className='round-btn'>{name}</div>
          </Link>
        </div>  
        <div className='two columns'>{truncate(entityScore, 2)}</div>
        <div className='two columns'>
          <i className='fa fa-plus fa-lg pull-right' style={{
            color: following[id] ? 'black' : 'lightgray'
          }} ariaHidden='true' onClick={ _ => toggleFollow(id, 'entities')}></i>
        </div>
      </div>
    </Link>
    );
}

EntityListItem.PropTypes = {
  name: PropTypes.string.isRequired,
  entityScore: PropTypes.number.isRequired,
};

export default EntityListItem;