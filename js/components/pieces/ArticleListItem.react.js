import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function ArticleListItem({id, name, url, basic_summary, header_image, authors}) {
  return (
    <div className='row article-body' key={id}>
      <div className='five columns article-header-image-container'>
      <img className='u-max-full-width article-header-image' src={header_image} />
      </div>
      <div className='seven columns'>
          <div className='article-name'>
            <span><Link to={'/articles/' + id}>{name}</Link></span>
          </div>
          <div className='article-authors'>
          {authors.map((author, i) => <span key={i}><Link to={'/authors/' + author.id}>{author.name} </Link></span>)}
          </div>
          <div className='article-bulletpoints'>
            <ul>
            {basic_summary.map((bulletPoint, i) => (i < 3 && bulletPoint.length > 5) ? <li key={i}>{bulletPoint}</li> : null)}
            </ul>
          </div>
        </div>
      </div>
    );
}

ArticleListItem.PropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  header_image: PropTypes.string.isRequired,
  basic_summary: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

export default ArticleListItem;
