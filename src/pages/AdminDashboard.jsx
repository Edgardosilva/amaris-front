import React from 'react';
import Layout from '../components/Layout';
import AdminCalendar from '../components/AdminCalendar';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='w-full h-full m-16 '>
                <AdminCalendar />
            </div>
        </Layout>
    );
};

export default AdminDashboard;