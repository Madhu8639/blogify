import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type='text',
    className="",
    ...props
},ref) {
    const id = useId();
  return (<div  >
    {label&& <label 
    htmlFor={id}
    className=' '
    >
    {label}
    </label>}
    <input type={type}  ref = {ref}
     {...props}
     className={className}
     id = {id}

     />
  </div>)
})

export default Input