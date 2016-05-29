
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  componentDidMount() {
    $('.ui.search')
    .search({
      apiSettings: {
        onResponse: function(res) {
          console.log(res);
        }
      },
      url: 'https://search.newsai.org/entity/entity/_search?q=data.name:{query}&size=10'
    });
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className='ui search'>
        <div className='ui icon input'>
        <input className='prompt' type='text' placeholder='Entity name...'></input>
        <i className='search icon'></i>
        </div>
        <div className='results'></div>
      </div> 
    );
  }
}


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdown);
