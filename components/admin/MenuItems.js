import React from 'react'
import axios from 'axios';

const MenuItems = ({menuItems}) => {

    function deleteMenuItem(menuItem){
        console.log(menuItem, " MENU ITEM TO DELETE")

        axios.delete(`/api/menus/${menuItem.term_id}`, {
            data: {
                ...menuItem
            }
        }).then((response) => {
            window.location.reload()
            console.log(response,"response on delete media item");
            console.log('NOW NEEDS TO REFRESH media itemS LIST!');
        }, (error) => {
            console.log(error, "ERROR on delete media item");
            console.log('NOW NEEDS TO DISPLAY ERROR')
        });

    }

    let menuItemsDisplay;
    if (menuItems){
        menuItemsDisplay = menuItems.map((menuItem, index)=>(
            <li key={index}>
                title ( post title if no title): <a href={`/admin/menus/${menuItem.term_id}`}>{menuItem.title && menuItem.title !== null ? menuItem.title : menuItem.post_title}</a> <br/>
                order: {menuItem.term_order} <br/>
                post id: {menuItem.ID} <br/>
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