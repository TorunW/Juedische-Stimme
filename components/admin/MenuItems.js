import React from 'react'
import axios from 'axios';

const MenuItems = ({menuItems}) => {

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

    let menuItemsDisplay;
    if (menuItems){
        menuItemsDisplay = menuItems.map((menuItem, index)=>(
            <li key={index}>
                title: <a href={`/admin/menus/${menuItem.term_id}`}>{menuItem.title}</a> <br/>
                order: {menuItem.term_order} <br/>
                link: {menuItem.link} <br/> 
                menu: {menuItem.taxonomy} <br/>
                <button onClick={() => deleteMenuItem(menuItem)}>delete menu item</button>
            </li>
        ))
    }

  return (
    <div>
        <ul>
            {menuItemsDisplay}
        </ul>
    </div>
  )
}

export default MenuItems