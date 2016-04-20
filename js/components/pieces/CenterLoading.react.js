import React from 'react';

function CenterLoading({name}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '100px',
    }}>
      <img src='../../../img/ripple.gif'></img>
      <span style={{
        fontSize: '1.6em',
        color: '#828282'
      }}>Loading {name}...</span>
    </div>
    );
}

export default CenterLoading;