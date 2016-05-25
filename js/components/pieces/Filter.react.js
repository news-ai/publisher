import React, { PropTypes } from 'react';
import EntitySearchBar from '../containers/EntitySearchBar.react';
// import PublisherSearchBar from '../containers/PublisherSearchBar.react';

function Filter() {
/*      <PublisherSearchBar
      title='Filter by Publisher'
      width='300px'
      max={1}
      />*/
  return (
    <div>
      <EntitySearchBar
      max={5}
      width='300px'
      />
    </div>
    );
}

Filter.PropTypes = {
};

export default Filter;
