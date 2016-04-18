import React from 'react';

function ArticleInputBar({inputHandler, onClickHandler}) {
  return (
    <div className='row'>
    <span>Add Article</span>
       <input
        className='u-max-full-width'
        type='text'
        onKeyUp={ e => {
			if (e.which === 13) onClickHandler();
        }}
        onChange={e => inputHandler(e.target.value)}
        ></input>
        <button onClick={ _ => onClickHandler()}>Submit</button>
    </div>
    );
}

export default ArticleInputBar;
