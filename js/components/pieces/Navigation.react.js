import React from 'react';
import { Link } from 'react-router';

function Navigation({ isLogin }) {
  return (
    <div>
      { isLogin ? (
          <div className='ui fixed top attached menu'>
            <div className='item'>
            <Link to={'/'}><span id='projectName'>NewsAI</span></Link>
            </div>
            <Link to={'/discovery'}><span className='item' style={{ margin: '5px' }}>Add Article</span></Link>
            <Link to={'/starred'}><span className='item' style={{ margin: '5px' }}>Starred</span></Link>
            <Link to={'/read_later'}><span className='item' style={{ margin: '5px' }}>Read Later</span></Link>
            <Link to={'/following'}><span className='item' style={{ margin: '5px' }}>Following</span></Link>
          </div>
          )
        : (
          <div className='ui fixed top attached one item menu'>
            <Link to={'/'}><span id='projectName'>NewsAI</span></Link>
          </div>
          ) }
    </div>
  );
}

export default Navigation;
