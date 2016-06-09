import React, { PropTypes } from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

function logChange(val) {
  console.log(val);
}

const getOptions = value => {
  if (value.length === 0) return;
  return fetch(`https://search.newsai.org/entity/entity/_search?q=data.name:${value}&size=10`)
  .then( response => response.text())
  .then( body => {
    const json = JSON.parse(body).hits;
    const entities = json.hits.map( obj => obj._source.data);
    const data = entities.map( entity => {
      return { value: entity, label: entity.name };
    });
    return { options: data };
  });
}


function Dropdown() {
  return (
    <div>
      <Select.Async
        name='form-field-name'
        loadOptions={getOptions}
        clearable
        multi
        autoload={false}
        filterOption={ _ => true }
        onChange={ val => console.log(val)}
        />
    </div>
    );
}

Dropdown.PropTypes = {
};

export default Dropdown;