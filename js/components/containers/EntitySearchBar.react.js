import { connect } from 'react-redux';
import * as actionCreators from '../../actions/filterActions';
import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


function logChange(val) {
  console.log("Selected: " + val);
}

function Typeahead({ map, title }) {
  return (
    <div>
    EYYY
    <Select name='form-field-name'
    isLoading={true}
    onChange={logChange}
    />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    title: 'Entity Search',
    map: state.entityReducer,
  };
};


const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Typeahead);