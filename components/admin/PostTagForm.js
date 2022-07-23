import React,  { useState, useEffect } from 'react'
import axios from 'axios'

const PostTagForm = (props) => {

    const [ tags, setTags ] = useState()
    const [ tagNames, setTagNames ] = useState(props.tagNames)
    const [ suggestedTags, setSuggestedTags ] = useState([])
    const [ searchPhrase, setSearchPhrase ] = useState("")

    useEffect(() => {
        getPostTags()
    },[])
    
    useEffect(() => {
        if (tags){
            let newTagNames = "";
            tags.forEach(function(tag,index){
                if (newTagNames.length === 0) newTagNames = tag.name;
                else newTagNames += `,${tag.name}`
            })
            setTagNames(newTagNames)
        }
    },[tags])

    useEffect(() => {
        setSuggestedTags([])
        if (searchPhrase.length >= 3){
            getTagsBySearchPhrase()
        }
    },[searchPhrase])
    
    async function getPostTags(){
        const res  = await fetch(`/api/tags/${props.postId}`)
        const data = await res.json()
        setTags(data)
    }

    async function getTagsBySearchPhrase(){
        const res  = await fetch(`/api/tags/search/${searchPhrase}`)
        const data = await res.json();
        setSuggestedTags(data)
    }

    async function createNewTag(){
        console.log(searchPhrase)

        const values = {
            name:searchPhrase,
            slug:searchPhrase.toLowerCase().split(' ').join('-')
        }
        console.log(values , " VALUES ")
        axios({
            method: 'post',
            url: `/api/tags/${props.postId}`,
            data:{
                ...values
            }
        }).then((response) => {
            console.log(response,"response on add tag to post");
            setSearchPhrase('')
            getPostTags()
        }, (error) => {
            console.log(error, "ERROR on add tag to post");
        });
    }

    async function addTagToPost(tag,tagIndex){
        axios({
            method: 'post',
            url: `/api/tags/${props.postId}/${tag.term_id}`,
        }).then((response) => {
            console.log(response,"response on add tag to post");
            setSearchPhrase('')
            getPostTags()
        }, (error) => {
            console.log(error, "ERROR on add tag to post");
        });
    }

    async function removeTagFromPost(tag){
        axios({
            method: 'delete',
            url: `/api/tags/${props.postId}/${tag.term_id}`,
        }).then((response) => {
            console.log(response,"response on remove tag from post");
            getPostTags()
        }, (error) => {
            console.log(error, "ERROR on remove tag from post");
        });
    }

    let suggestedTagsDisplay, newTagDisplay;
    if (searchPhrase.length > 0){
        if (searchPhrase.length < 3){
            suggestedTagsDisplay = <span>MINIMUM 3 CHARS!!!</span>
        } else {
            newTagDisplay = (
                <a onClick={() => createNewTag()}>
                    <span style={{margin:"0 5px", backgroundColor:"pink",padding:"3px"}}>
                        {searchPhrase}
                    </span>
                </a>
            )
            if (suggestedTags.length > 0){
                suggestedTagsDisplay = suggestedTags.map((tag,index)=>{
                    // ONLY SHOW TAGS THAT THE POST DOESNT HAVE!
                    if (!tagNames || tagNames.indexOf(tag.name) === -1){
                        return (
                            <a key={tag.term_id} onClick={() => addTagToPost(tag,index)}>
                                <span style={{margin:"0 5px", backgroundColor:"yellow",padding:"3px"}}>
                                    {tag.name}
                                </span>
                            </a>
                        )
                    }
                })
            }
        }
    }

    let tagsDisplay;
    if (tags){
        tagsDisplay = tags.map((tag,index)=>(
            <span key={tag.term_id} style={{margin:"0 5px", backgroundColor:"green",padding:"3px"}}>
                {tag.name} - <a onClick={() => removeTagFromPost(tag)}>X</a>
            </span>
        ))
    }

    return (
        <div>
            <input type="text" value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)} placeholder={'Search or add a new tag'} />
            <hr/>
            {newTagDisplay}
            {suggestedTagsDisplay}
            <hr/>
            {tagsDisplay}
        </div>
    )
}

export default PostTagForm