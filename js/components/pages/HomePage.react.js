/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';

// class HomePage extends Component {
//   render() {
//     return (
//       <div>
//         <h1>{projectName}</h1>
//         <ArticleList articles={articles} />
//       </div>
//       );
//   }
// }

function HomePage({projectName, articles}) {
  return (
    <div>
        <h1>{projectName}</h1>
        <ArticleList articles={articles} />
      </div>
    );
}


const mapStateToProps = (state) => {
  return {
    projectName: state.feedReducer.projectName,
    articles: state.feedReducer.articles
  };
};

// Wrap the component to inject dispatch and state into it
export default connect(
  mapStateToProps
)(HomePage);
