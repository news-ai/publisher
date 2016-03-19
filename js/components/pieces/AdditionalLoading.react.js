import React from 'react';

function AdditionalLoading({name}) {
  return (
    <div style={{
      backgroundColor: 'gray',
      color: 'white',
      fontSize: '2em',
      width: '100% !important',
      position: 'absolute',
      textAlign: 'center',
      borderRadius: '25px'
    }}>The {name} loading</div>
    );
}

export default AdditionalLoading;