import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';

class Publisher extends Component {
  componentDidMount() {
    let {dispatch, publisherId, publisher} = this.props;
    let action = actionCreators.fetchPublisher(publisherId);
    if (publisher === undefined) dispatch(action);
  }

  render() {
    let {publisherId, publisher} = this.props;
    const loading = (<span>The publisher is loading</span>);
    return (
      <div className='container publisher'>
        <div className='row'>
          { (publisher === undefined) ? loading : (
        <div className='twelve columns'>
              <h5>{publisher.name}</h5>
              <span>{publisher.url}</span>
            </div>
        )}
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const publisherId = parseInt(props.params.publisherId);
  return {
    publisherId: publisherId,
    publisher: state.publisherReducer[publisherId]
  };
};

export default connect(mapStateToProps)(Publisher);