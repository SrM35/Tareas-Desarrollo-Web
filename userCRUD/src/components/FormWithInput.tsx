import { useState } from "react";

type FormWithInputProps = {
    buttonText: string;
    placeholder: string;
    id: string;
    onSubmit: (value: string) => void;
};
const FormWithInput = ({buttonText, placeholder, id, onSubmit,}: FormWithInputProps) => {
    const [value, setValue] = useState('');

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
            <form onSubmit={handleFormSubmit}>
                <input 
                name={id}
                id={id} 
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange} 
                />
                <button type="submit">{buttonText}</button>
            </form>
        );
};

    export default FormWithInput;