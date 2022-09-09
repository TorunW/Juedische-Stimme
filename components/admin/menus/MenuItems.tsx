import React, { ReactElement, useState } from 'react'
import axios from 'axios';
import menuTypes from 'lib/menuTypes.json'

const MenuItems = ({menuItems}) => {
    
    const [ currentMenu, setCurrentMenu ] = useState('main_menu')

    function deleteMenuItem(menuItem){
        axios.delete(`/api/menus/${menuItem.term_id}`, {
            data: {
                ...menuItem
            }
        }).then((response) => {
            window.location.reload()
            console.log(response,"response on delete media item");
        }, (error) => {
            console.log(error, "ERROR on delete media item");
        });

    }

    let menuItemsDisplay: ReactElement;
    if (menuItems){
        const menuItemsArray =  menuItems.filter(menuItem => menuItem.taxonomy === currentMenu)
        if (menuItemsArray.length === 0) menuItemsDisplay = <p>no menu items for {currentMenu}</p>
        else {
            menuItemsDisplay = menuItemsArray.map((menuItem:any, index:number)=> (
                <li key={index}>
                    title: <a href={`/admin/menus/${menuItem.term_id}`}>{menuItem.title}</a> <br/>
                    order: {menuItem.term_order} <br/>
                    link: {menuItem.link} <br/> 
                    menu: {menuItem.taxonomy} <br/>
                    <button onClick={() => deleteMenuItem(menuItem)}>delete menu item</button>
                </li>
            ))
        }
    }

  return (
    <div>
        <ul>
        {menuTypes.map((menu,index)=>(
            <li key={index + Date.now()}>
                <a onClick={() => setCurrentMenu(menu)}>
                {menu}
                </a>
            </li>
        ))}
        </ul>
        <hr/>
        <ul>
            {menuItemsDisplay}
        </ul>
    </div>
  )
}

export default MenuItems