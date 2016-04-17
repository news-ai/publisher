import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function formatTime(datestring) {
  const date = new Date(datestring);
  let hour = date.getHours();
  const timestring = hour < 12 ? 'AM': 'PM';
  if (hour > 12) hour -= 12;
  return {
    date: date.toDateString(),
    timestring: timestring,
    hour: hour,
    minute: date.toTimeString().substring(6, 8),
  };
}

function ArticleListItem({id, name, url, summary, added_at, authors, publisher, entity_scores}) {
  const dateObj = formatTime(added_at);
  return (
    <div className='row article-body' key={id}>
      <div className='twelve columns'>
          <div className='article-name'>
            <Link style={{color: 'black', fontWeight: 550}} to={'/articles/' + id}><span>{name}</span></Link>
          </div>
          <div className='article-publisher'>
            <Link to={'/publishers/' + publisher.id}><span>{publisher.name}</span></Link>
          </div>
            {entity_scores.length >= 3 ? (
            <div className='article-top3-entities'>
              {entity_scores.map((entity, i) => (i < 3) ?
              <Link to={'/entities/' + entity_scores[i].entity.id}><div>{entity_scores[i].entity.name}</div></Link>
              : null)}
            </div>
              ) : null}
          <div className='article-authors'>
          {authors.map((author, i) => <span key={i}><Link to={'/authors/' + author.id}>{author.name} </Link></span>)}
          </div>
          <div className='article-bulletpoints'>
          <span>
          {summary}
          </span>
          <div>
            <span className='pull-right article-list-item-date'>{dateObj.date} {dateObj.hour}:{dateObj.minute} {dateObj.timestring}</span>
          </div>
          </div>
        </div>
      </div>
    );
}

ArticleListItem.PropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  added_at: PropTypes.string.isRequired,
  header_image: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
};

export default ArticleListItem;
