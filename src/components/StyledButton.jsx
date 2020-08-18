import React from 'react';

const StyledButton = ({
    backgroundColor='#00C08B',
    backgroundColorDisabled = '#8FD6BD',
    children,
    className,
    width=94,
    type='button',
    ...props
  }) => {
  if (type === 'submit') {
    return (
      <input
        className={`styled-button ${className}`}
        type={type}
        style={{
          backgroundColor: props.disabled ? backgroundColorDisabled : backgroundColor,
          width: width,
        }}
        {...props}
      >
        {children}
      </input>
    )
  } else {
    return (
      <button
        className={`styled-button ${className}`}
        type={type}
        style={{
          backgroundColor: props.disabled ? backgroundColorDisabled : backgroundColor,
          width: width,
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default StyledButton