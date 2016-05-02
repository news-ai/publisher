import React from 'react';

function ArticleInputBar({url, inputHandler, onClickHandler, isReceiving, didInvalidate}) {
    return (
    <div className='row' style={{
        marginBottom: '5px',
        marginTop: '5px',
    }}>
    <span style={{
        margin: '5px',
        color: 'gray'
    }}>Put article URL here to get summary and entities</span>
        <div className='row' style={{
            display: 'flex',
            alignItems: 'center',
        }}>
       <input
        className='u-full-width'
        type='text'
        onKeyUp={ e => e.which === 13 ? onClickHandler() : null}
        onChange={ e => inputHandler(e.target.value)}
        defaultValue=''
        value={url}
        style={{
            border: didInvalidate ? '1px solid red' : null
        }}>
        </input>
        { isReceiving ? <img style={{
            marginLeft: '5px',
            marginRight: '5px',
            width: '30px',
            height: '30px',
        }} src='../../img/default_loading.gif'></img> :
        <div style={{
            marginLeft: '9px',
            marginRight: '9px',
            width: '29px',
            height: '29px',
        }}></div>}
        <button style={{
            border: didInvalidate ? '1px solid red' : null
        }} onClick={ _ => onClickHandler()}>Submit</button>

        </div>
        { didInvalidate ? <span style={{
            color: 'red',
            position: 'absolute',
            marginLeft: '10px'
        }}>Invalid.</span> : null }
    </div>
    );
}

export default ArticleInputBar;
