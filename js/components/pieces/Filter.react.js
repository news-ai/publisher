import React, { PropTypes } from 'react';
import EntitySearchBar from '../containers/EntitySearchBar.react';
// import PublisherSearchBar from '../containers/PublisherSearchBar.react';
import Select from 'react-select';

function logChange(val) {
  console.log("Selected: " + val);
}

function Filter() {
/*      <PublisherSearchBar
      title='Filter by Publisher'
      width='300px'
      max={1}
      />*/
  let options = [
  { value: 'one', label: 'ONE' },
  { value: 'two', label: 'TWO' },
  ];
  return (
    <div>
      <EntitySearchBar
      max={5}
      width='300px'
      />
      <Select
        name='form-field-name'
        value='one'
        options={options}
        onChange={logChange}
        />
    </div>
    );
}

Filter.PropTypes = {
};

export default Filter;
