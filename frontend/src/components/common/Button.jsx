import React from 'react'

const Button = ({type, children, onClick, ...props}) => {
    let buttonClass = 'btn';

    if(type === 'primary') {
        buttonClass = 'btn btn-primary';
    }else if(type === 'secondary') {
        buttonClass = 'btn btn-secondary';
    }else if(type === 'accent') {
        buttonClass = 'btn btn-accent';
    }else if(type === 'ghost') {
        buttonClass = 'btn btn-ghost';
    }else if(type === 'link') {
        buttonClass = 'btn btn-link';
    }
  return (
    <button className={buttonClass} onClick={onClick} {...props}>
    {children}      
    </button>
  );
};

export default Button
