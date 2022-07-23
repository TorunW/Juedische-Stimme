import React from 'react'
import AdminNav from './Nav'

import styles from '../../styles/Admin.module.css'
import Link from 'next/link'

function AdminLayout({ children }) {
  return (
    <div>

      <div className={styles.adminHeader}>
        <h1>Admin</h1>
        <ul>
          <li>NEW</li>
          <ul>
            <li><Link href="/admin/posts/create">POST</Link></li>
            <li><Link href="/admin/categories/create">CATEGORY</Link></li>
            <li><Link href="/admin/menus/create">MENU ITEM</Link></li>
            <li><Link href="/admin/galleries/create">Gallery</Link></li>
            <li>USER</li>
          </ul>
        </ul>
      </div>

      <hr/>

      <div className={styles.adminSidebar}>
        <AdminNav/>
      </div>
      <div className={styles.adminMain}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout