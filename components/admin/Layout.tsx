import React from 'react'
import AdminNav from './Nav'
import styles from '/components/admin/Admin.module.css'
import Link from 'next/link'

function AdminLayout({ children }) {
  return (
    <div id="admin-layout">
      <header id="admin-header" className={styles.adminHeader}>
        <h1>Admin</h1>
        <ul>
          <li>NEW</li>
          <ul>
            <li><Link href="/admin/posts/create">POST</Link></li>
            <li><Link href="/admin/categories/create">CATEGORY</Link></li>
            <li><Link href="/admin/menus/create">MENU ITEM</Link></li>
            <li><Link href="/admin/galleries/create">Gallery</Link></li>
            <li><Link href="/admin/users/register">USser</Link></li>
          </ul>
        </ul>
      </header>
      <main className={styles.adminContent} id="admin-content">
        <AdminNav/>
        {children}
      </main>
    </div>
  )
}
export default AdminLayout