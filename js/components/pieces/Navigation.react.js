import React from 'react';
import { Link } from 'react-router';

function Navigation({ isLogin }) {
            //<Link to={'/following'}><span style={{ margin: '5px' }}>Following</span></Link>
  return (
    <div>
      <Link to={'/'}><span id='projectName'>NewsAI</span></Link>
      { isLogin ? (
          <div style={{
            paddingBottom: '20px',
            borderBottom: '2px solid black'
          }}>
            <Link to={'/discovery'}><span style={{ margin: '5px' }}>Add Article</span></Link>
            <Link to={'/starred'}><span style={{ margin: '5px' }}>Starred</span></Link>
            <Link to={'/read_later'}><span style={{ margin: '5px' }}>Read Later</span></Link>
          </div>
          )
        : null }
    </div>
  );
}

export default Navigation;
