
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
  }

  componentDidUpdate() {
  }

  render() {
    return (
        <div>
            <h2>Dropdown</h2>
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
