import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectTagById } from 'lib/queries'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTag } from 'store/tags/tagsSlice'
import TagForm from 'components/admin/TagForm'

export default function EditTagPage(props) {
  const dispatch = useDispatch();
  const { tag } = useSelector(state => state.tags)
  // console.log(tag, " TAG ")
  useEffect(() => {
    dispatch(setTag(JSON.parse(props.tag)[0]))
  },[props.tag])
  return (
    <div className={styles.container}>
      <h2>EDIT TAG</h2>
      <TagForm tag={tag} />
    </div>
  )
}

EditTagPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const tagResponse = await excuteQuery({
    query: selectTagById(context.query.id)
  });
  const tag = JSON.stringify(tagResponse);
  return {
    props:{
        tag
    }
  }
}