import React from 'react'
import Link from 'next/link'

function AdminNav() {
  return (
    <div>
      <ul>
        <li><Link href='/admin'>Dashboard</Link></li>
        <li><Link href='/admin/posts'>Posts</Link></li>
        <li><Link href='/admin/categories'>Categories</Link></li>
        <li><Link href='/admin/tags'>Tags</Link></li>
        <li><Link href='/admin/galleries'>Galleries</Link></li>
        <li><Link href='/admin/media'>Media</Link></li>
        <li><Link href='/admin/menus'>Menus</Link></li>
        <li><Link href='/admin/users'>Users</Link></li>
        <li><Link href='/admin/fbtoken'>Facebook Token</Link></li>
      </ul>
    </div>
  )
}

export default AdminNav