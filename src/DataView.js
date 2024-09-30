import React, { useEffect, useState } from 'react';


const DataView = ({ database }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:5000/api/`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (database) {
            fetchData();
        }
    }, [database]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data.length) return <div>No data available</div>;

    return (
        <div>
            <h2>Data from {database.toUpperCase()}</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Place of Birth</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.placeOfBirth}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default DataView;
