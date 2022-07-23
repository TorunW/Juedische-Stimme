import { useEffect } from 'react'
import { selectTags } from 'lib/queries';
import excuteQuery from 'lib/db'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTags } from 'store/tags/tagsSlice';
import AdminTags from 'components/admin/Tags';


export default function AdminTagsPage(props) {
    
    const dispatch = useDispatch();
    const { tags } = useSelector(state => state.tags)
    
    useEffect(() => {
        dispatch(setTags(JSON.parse(props.tags)))
    },[])

    return (
        <div className={styles.container}>
            <h2>TAGS</h2>
            <hr/>
            <ul>
                {tags ? <AdminTags tags={tags} /> : ""}
            </ul>
        </div>
    )
}

AdminTagsPage.layout = "admin"

export const getServerSideProps = async (context) => {    
  const tagsResponse = await excuteQuery({
    query:selectTags()
  });
  const tags = JSON.stringify(tagsResponse);
  return {
    props:{
        tags
    }
  }
}