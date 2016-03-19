import React from 'react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <div>
    <Link to={'/'}><span id='projectName'>NewsAI</span></Link>
  	</div>
    );
}

export default Navigation;