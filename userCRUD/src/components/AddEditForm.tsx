import { useState } from "react";
import type { User } from "../types/User.type";

const formDefaultValue: User = {
    "id": 0,
    "name": '',
    "email": '',
    "created": '',
};

type AddEditFormProps = {
    onSubmit: (value: User) => void;
    loading: boolean;
};
const AddEditForm = ({ onSubmit, loading,}: AddEditFormProps) => {
    const [formState, setFormState] = useState<User>(formDefaultValue);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        onSubmit(formState);
        setFormState(formDefaultValue);
    };

    const handleInputChange = (key: keyof User) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormState({
                ...formState,
                [key]: event.target.value,
            })
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                id='email'
                name='email'
                type="email"
                placeholder="Ingrese su email"
                value={formState.email}
                onChange={handleInputChange('email')}
                disabled={loading}
            />
            <input
                id='name'
                name='name'
                type="text"
                placeholder="Ingrese su nombre"
                value={formState.name}
                onChange={handleInputChange('name')}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {
                    loading ? 'Guardando...' : 'Guardar'
                }
            </button>
        </form>
    );
};

export default AddEditForm;