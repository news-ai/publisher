import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function FollowingList({list, followType, following, toggleFollow, clickPrev, clickNext, pageIdx, maxPages}) {
  return (
    <div className='ui stackable four column grid' style={{
      marginTop: '20px',
      marginBottom: '5px'
    }}>
      { list.length > 0 ? list.map( item => (
        <div className='column' style={{
          padding: '5px 10px 5px 10px',
          border: '1px solid lightgray',
        }}>
              <Link to={`/${followType}/${item.id}`}>
                <div className='round-btn'>{item.name}</div>
              </Link>
              <i className='fa fa-plus fa-lg' style={{
                color: following[item.id] ? 'black' : 'lightgray',
              }} ariaHidden='true' onClick={ _ => toggleFollow(item.id)}></i>
          </div>
        )) : <span>You are not following any {followType}.</span> }

      <div className='row' style={{marginTop: '25px'}}>
      { pageIdx > 0 && pageIdx < maxPages ? <button onClick={clickPrev}>Previous</button> : null }
      { pageIdx < maxPages - 1 ? <button onClick={clickNext}>Next</button> : null }
      </div>
    </div>
    );
}

FollowingList.PropTypes = {
};

export default FollowingList;
