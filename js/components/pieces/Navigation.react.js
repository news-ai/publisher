import React from 'react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <div>
    <Link to={'/'}><h1 style={{
      color: 'black'
    }}>NewsAI</h1></Link>
  	</div>
    );
}

export default Navigation;