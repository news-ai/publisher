import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function FollowingList({fetchFollow, list, next, followType, following, toggleFollow}) {

      //{ next !== null && next !== undefined ? <button onClick={ _ => fetchFollow(followType)}>More</button> : null }
  return (
      <div style={{
        margin: 'auto',
        paddingLeft: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
      { list.length > 0 ? list.map( item => (
        <div style={{
          marginTop: '8px',
          width: '230px',
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px 5px 10px',
          border: '1px solid lightgray',
        }}>
            <div>
              <Link to={`/${followType}/${item.id}`}>
                <div className='round-btn'>{item.name}</div>
              </Link>
              <i className='fa fa-plus fa-lg' style={{
                color: following[item.id] ? 'black' : 'lightgray',
                alignSelf: 'flex-end'
              }} ariaHidden='true' onClick={ _ => toggleFollow(item.id)}></i>
            </div>  
          </div>
        )) : <span>You are not following any {followType}.</span> }
      </div>
    );
}

FollowingList.PropTypes = {
};

export default FollowingList;
