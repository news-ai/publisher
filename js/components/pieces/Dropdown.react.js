import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    $('.ui.selection.dropdown').dropdown();
  }

  componentDidUpdate() {
    console.log($('.ui.selection.dropdown').dropdown('get value'));
  }

  _onChange(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className='ui fluid multiple search selection dropdown'>
        <input onChange={this._onChange} type='hidden' name='entity' />
        <div className='default text'>Select Entities</div>
        <i className='dropdown icon'></i>
        <div className='menu'>
        </div>
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
