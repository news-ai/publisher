import React from 'react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <div>
    <Link to={'/'}><h5>Home</h5></Link>
  	</div>
    );
}

export default Navigation;