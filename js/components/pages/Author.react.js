import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';

class Author extends Component {
  componentDidMount() {
    let {dispatch, authorId, author} = this.props;
    let action = actionCreators.fetchAuthor(authorId);
    if (author === undefined) dispatch(action);
  }

  render() {
    let {authorId, author} = this.props;
    const loading = (<span>The author is loading</span>);
    return (
      <div className='container author'>
        <div className='row'>
          { (author === undefined) ? loading : (
        <div className='twelve columns'>
            <h5>{author.name}</h5>
            <p>Writes for: {author.writes_for.map((publisher) => <span key={publisher.id}>{publisher.name}</span>)}</p>
          </div>
        )}
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const authorId = parseInt(props.params.authorId);
  return {
    authorId: authorId,
    author: state.authorReducer[authorId]
  };
};

export default connect(mapStateToProps)(Author);