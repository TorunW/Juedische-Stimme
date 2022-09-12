import React, { FC } from 'react'
import axios from 'axios';
import { Tag } from 'types/Tag.type';

interface AdminTagsProps {
    tags?: Tag[]
}

const AdminTags: FC<AdminTagsProps> = ({tags}) => {

    function onDeleteTag(tag:Tag){
        // console.log('now delete the tag + ALL OF ITS RELATIONSHIP, TAXONOMY USW')
        axios.delete(`/api/tags/tag/${tag.term_id}`).then((response) => {
            window.location.reload()
            console.log(response,"response on delete tag");
            console.log('NOW NEEDS TO REFRESH TAGS LIST!');
        }, (error) => {
            console.log(error, "ERROR on delete tag");
            console.log('NOW NEEDS TO DISPLAY ERROR')
        });
    }

    return (
        <div>
            {tags.map((tag,index) => (
                <li key={tag.term_id}>
                    <h3>{tag.name} <small>({tag.count})</small></h3>
                    <a href={`/admin/tags/${tag.term_id}`}>
                        edit
                    </a>
                    <br/>
                    <a href={`/tag/${tag.slug}/page/1`}>
                        view on live site
                    </a>
                    <br/>
                    <a onClick={() => onDeleteTag(tag)}>
                        DELETE TAG
                    </a>
                </li>
            ))}
        </div>
    )
}

export default AdminTags