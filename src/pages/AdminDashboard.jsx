import React from 'react';
import Layout from '../components/Layout';
import AdminCalendar from '../components/AdminCalendar';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='md:w-[1200px] mt-6 m-4 '>
                <AdminCalendar />
            </div>
        </Layout>
    );
};

export default AdminDashboard;