import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';

function Entity({name, entityScore}) {
  return (
    <div>
    <span>{name}</span>
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

export default Entity;