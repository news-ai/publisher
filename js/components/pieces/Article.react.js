import React, { Component, PropTypes } from 'react';

function Article({id, name, url, basic_summary}) {
  return (
    <div className='row article-body' key={id}>
        <div className='five columns article-name'>
        <span>{name}</span>
        </div>
        <div className='seven columns article-bulletpoints'>
        <ul>
        {basic_summary.map((bulletPoint, i) => (i < 3) ? <li key={i}>{bulletPoint}</li> : null)}
        </ul>
        </div>
      </div>
    );
}

Article.PropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  basic_summary: PropTypes.array.isRequired,
}

export default Article;
