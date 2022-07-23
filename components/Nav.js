import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

function Nav() {
    const { items } = useSelector(state => state.nav)
    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                {items.map((item,index)=>(
                    <li key={index}>
                        <Link href={'/'+item.post_name}>{item.post_title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav