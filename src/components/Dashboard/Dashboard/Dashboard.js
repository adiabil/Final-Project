import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Table from 'react-bootstrap/Table';


const Dashboard = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { user }= useContext(AuthContext)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const { data, loading, error } = useFetch(`${baseUrl}/auth/patients`);
    const handleDateChange = date => {
        setSelectedDate(date);
    }
    const showAllPatientsList = () =>{
        setAppointments(data);
    }
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/therapist/patients/${user._id}`)
                setAppointments(res.data)
console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    return (
        <section className='container row g-0'>
            <div className='col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                <div className=''>
                    <h5 style={{fontWeight:600, marginBottom:20}}>My Patients</h5>
                     <div className='card shadow'>
            <Table striped responsive>
            <thead>
                <tr>
                    <th className="text-secondary" scope="col">#</th>
                    <th className="text-secondary" scope="col">Name</th>

                    <th className="text-secondary" scope="col">Email</th>
                    
                </tr>
            </thead>
            <tbody>
                {appointments && appointments?.map((item, index) =>
                    <tr key={index + 200}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>

                        <td>{item.email}</td>
                        
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;