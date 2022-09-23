import { hasCookie } from 'cookies-next';
import React from 'react';
import { NextPageContext } from 'next';

function AdminDashboard() {
  return (
    <section id='admin-dashboard'>
      <h2>Dashboard</h2>
      <hr />
      <p>
        quick overview of things in the admin, things that need attention etc
      </p>
    </section>
  );
}

AdminDashboard.layout = 'admin';
export default AdminDashboard;

export const getServerSideProps = async (context: NextPageContext) => {
  if (!hasCookie('Token', { req: context.req, res: context.res }))
    return { redirect: { destination: '/login', permanent: false } };
  return {
    props: {},
  };
};
