import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

function AdminNav() {
  const router = useRouter();

  function logout() {
    deleteCookie('Token')
    sessionStorage.removeItem('Token');
    router.push('/login');
  }
  return (
    <div>
      <ul>
        <li>
          <Link href='/admin'>Dashboard</Link>
        </li>
        <li>
          <Link href='/admin/about'>About Info</Link>
        </li>
        <li>
          <Link href='/admin/posts'>Posts</Link>
        </li>
        <li>
          <Link href='/admin/categories'>Categories</Link>
        </li>
        <li>
          <Link href='/admin/tags'>Tags</Link>
        </li>
        <li>
          <Link href='/admin/galleries'>Galleries</Link>
        </li>
        <li>
          <Link href='/admin/media'>Media</Link>
        </li>
        <li>
          <Link href='/admin/menus'>Menus</Link>
        </li>
        <li>
          <Link href='/admin/users'>Users</Link>
        </li>
        <li>
          <Link href='/admin/fbtoken'>Facebook Token</Link>
        </li>
        <li>
          <Link href='/admin/register'>Register new user</Link>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminNav;
