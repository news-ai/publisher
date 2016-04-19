import React from 'react';
import { Link } from 'react-router';

function Navigation({isLogin}) {
  return (
    <div>
    <Link to={'/'}><span id='projectName'>NewsAI</span></Link>
    {
    	isLogin ?
    	<Link to={'/discovery'}><span style={{ margin: '5px' }}>Add Article</span></Link>
    	: null
    }
  	</div>
    );
}

export default Navigation;