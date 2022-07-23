import React from 'react'

const AdminCategories = ({ categories }) => {
    let categoriesDisplay;
    if (categories){
        console.log(categories)
        categoriesDisplay = categories.map((category,index)=>(
            <li key={category.term_id}>
                <a href={`/admin/categories/${category.term_id}`}>
                    <span>{category.name} ({category.count})</span>
                    
                </a>
            </li>
        ))
    }
    return (
        <div>{categoriesDisplay}</div>
    )
}

export default AdminCategories