import { useEffect } from 'react'
import { selectMediaItems } from 'lib/queries'
import excuteQuery from 'lib/db'
import styles from 'styles/Home.module.css'
import MediaItems from 'components/admin/MediaItems';
import { useDispatch, useSelector } from 'react-redux'
import { setMediaItems } from 'store/mediaitems/mediaItemsSlice';


export default function AdminMediaPage(props) {
    
  const dispatch = useDispatch();
  const { mediaItems } = useSelector(state => state.mediaItems)

  useEffect(() => {
      dispatch(setMediaItems(JSON.parse(props.mediaItems)))
  },[])

  let mediaItemsDisplay;
  if (mediaItems) mediaItemsDisplay = <MediaItems mediaItems={mediaItems} />

  return (
      <div className={styles.container}>
          <h2>Media</h2>
          <hr/>
          <ul>
              {mediaItemsDisplay}
          </ul>
      </div>
  )
}

AdminMediaPage.layout = "admin"

export const getServerSideProps = async (context) => {    
  const mediaResponse = await excuteQuery({
    query:selectMediaItems(50,context.query.number)
  });
  const mediaItems = JSON.stringify(mediaResponse);
  return {
    props:{
      mediaItems:mediaItems
    }
  }
}