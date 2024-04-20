"use client";
import { useFormState, useFormStatus } from "react-dom";

const Form = (props) => {
    const [response, formSubmit] = useFormState(props.action, props.initialState);
    const {pending} = useFormStatus();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        props.onSubmit && props.onSubmit(formData);
        formSubmit(formData);
    }

    return (
        <form method="POST" className={props.style} onSubmit={handleSubmit} encType="multipart/form-data" >
            {response && response.error && <div className="alert alert-error col-span-full">{response.error}</div>}
            {props.children}
            <button type="submit" className={props.button.style} disabled={pending}>
                {pending ? <span className="loading loading-spinner loading-md"></span> : props.button.text}
            </button>
        </form>
    )
}

export default Form;