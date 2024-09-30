import React, { useEffect, useState } from 'react';
import './FormModal.css';
import DataView from './DataView';

const FormModal = ({ isOpen, toggleModal, database }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        placeOfBirth: '',
        age: '',
        gender: ''
    });

    const [viewMode, setViewMode] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);  // log formdata
        try {
            const response = await fetch(`http://localhost:5000/api/${database}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Response:", result);  
            if (response.ok) {
                toggleModal();
                alert('Successfully Submitted the data');
            } else {
                console.error("Failed to submit form:", result);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                placeOfBirth: '',
                age: '',
                gender: ''
            });
            setViewMode(false);  
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={toggleModal}>&times;</span>
                    <h2>{viewMode ? `View Data from ${database.toUpperCase()}` : `Submit Data to ${database.toUpperCase()}`}</h2>
                    {viewMode ? (
                        <DataView database={database} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                            <input type="text" placeholder="Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required />
                            <input type="number" placeholder="Age" name="age" value={formData.age} onChange={handleChange} required />
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    <button onClick={() => setViewMode(!viewMode)}>
                        {viewMode ? 'Switch to Form' : 'View Data'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormModal;
