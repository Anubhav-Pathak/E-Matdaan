"use client";
import { forwardRef } from "react";

const Input = forwardRef(({type, name, label, styles, inputStyle, children}, ref) => {
    return (
        <label className={`input input-bordered flex items-center gap-2 ${styles}`}>
            {children}
            <input ref={ref} type={type} name={name} className={`grow ${inputStyle}`} placeholder={label} />
        </label>
    )
})

Input.displayName = 'Input';

export default Input