import React from 'react'
import { useSelector } from 'store/hooks'

const PostsHeader = () => {

    const { categories, categoryName } = useSelector(state => state.categories)

    console.log(categories, categoryName)

    return (
        <div id="admin-posts-header">
            <div>
                <label>SELECT CATEGORY</label>
                <select value={categoryName} onChange={e => window.location.href = `/admin/posts/category/${e.target.value}/page/1`}>
                    {categories && categories !== null 
                        ?
                            categories.map((category,index)=>(
                                <option key={category.term_id} value={category.name}>{category.name}</option>
                            ))
                        :
                            ""
                    }
                </select>
            </div>
            <hr/>
        </div>
    )
}

export default PostsHeader