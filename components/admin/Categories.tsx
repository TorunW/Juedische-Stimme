import axios from 'axios'
import React, { ReactElement } from 'react'
import type { Category } from 'types/Category.type'
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';

interface AdminCategoriesProps {
    categories: Category[]
}

const AdminCategories = ({ categories }:AdminCategoriesProps) => {

    const deleteCategory = (category:Category) => {
        const confirmDelete = confirm(`are you sure you want to delete ${category.name}?`)
        axios.delete(`/api/categories/${category.term_id}`)
        .then(response => {
            console.log(response, " REPONSE ON DELETE CATEGORY ")
            window.location.reload()
        })
        .catch(error => {
            console.log(error, " ERROR ON DELETE CATEGORY")
        })
    }

    let categoriesDisplay: ReactElement[];
    if (categories){
        console.log(categories)
        categoriesDisplay = categories.map((category:Category,index:number)=>(
            <li key={category.term_id}>
                <Image src={generateImageUrl(category.category_image)} width={100} height={100} />
                <a href={`/admin/categories/${category.term_id}`}>
                    <span>{category.name} ({category.count})</span>
                </a>
                {category.term_id !== 66 && category.term_id !== 2 && category.term_id !== 1 ? <button onClick={() => deleteCategory(category)}>DELETE</button> : ""}
            </li>
        ))
    }
    return (
        <div>{categoriesDisplay}</div>
    )
}

export default AdminCategories