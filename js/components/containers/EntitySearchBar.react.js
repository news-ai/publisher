import { connect } from 'react-redux';
import * as actionCreators from '../../actions/filterActions';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const FLAVOURS = [
  // { label: 'Chocolate', value: 'chocolate' },
  // { label: 'Vanilla', value: 'vanilla' },
  // { label: 'Strawberry', value: 'strawberry' },
  // { label: 'Caramel', value: 'caramel' },
  // { label: 'Cookies and Cream', value: 'cookiescream' },
  // { label: 'Peppermint', value: 'peppermint' },
];


function logChange(val) {
  console.log(val);
}

class Typeahead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: FLAVOURS,
      value: [],
      isLoading: false
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getEntities = this.getEntities.bind(this);
  }
  handleSelectChange(value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }

  gotoEntity(value, event) {
    window.open('https://publisher.newsai.org/entities' + value);
  }

  getEntities(value) {
    if (value.length < 2) return;
    console.log(value);
    this.setState({ isLoading: true });
    return fetch(`https://search.newsai.org/entity/entity/_search?q=data.name:${value}&size=10`)
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body);
      const hits = json.hits;
      const entities = hits.hits.map( obj => obj._source.data);
      const options = entities.map( entity => {
        return {value: entity.name, label: entity.name};
      });
      console.log(options);
      this.setState({
        options,
        isLoading: false
      });
      // return { options: output };
    });
  }

  render() {
    return (
      <div>
      EYYY
      <Select
      multi
      simpleValue
      allowCreate
      isLoading={this.state.isLoading}
      value={this.state.value}
      placeholder="Select your favourite(s)"
      options={this.state.options}
      onChange={this.handleSelectChange}
      onInputChange={this.getEntities}
      />
      </div>
    );
  }
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