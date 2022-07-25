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
                {items.map((item,index)=> (
                    <li key={Date.now() + index}>
                        <Link href={'/'+ (item.link && item.link !== null ? item.link : item.post_name)}>
                            {item.title && item.title !== null ? item.title : item.post_title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav