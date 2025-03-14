import React from 'react';
import Layout from '../components/Layout';
import AdminCalendar from '../components/AdminCalendar';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='w-[1200px] mt-6 '>
                <AdminCalendar />
            </div>
        </Layout>
    );
};

export default AdminDashboard;