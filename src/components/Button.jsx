import React from 'react'

const Button = ({Children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) => { 
  return (
    <button className={className} {...props}>
        {Children}
    </button>
  )
}

export default Button