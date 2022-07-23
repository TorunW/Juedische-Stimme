import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectGalleries } from 'lib/queries'
import styles from 'styles/Home.module.css'
import Galleries from 'components/admin/Galleries';

import { useDispatch, useSelector } from 'react-redux'
import { setGalleries } from 'store/galleries/galleriesSlice';

export default function AdminGalleriesPage(props) {
  
  const dispatch = useDispatch();
  const { galleries } = useSelector(state => state.galleries)

    useEffect(() => {
        dispatch(setGalleries(JSON.parse(props.galleries)))
    },[])

    return (
        <div className={styles.container}>
            <h2>Galleries</h2>
            <hr/>
            <ul>{galleries ? <Galleries galleries={galleries} /> : ""}</ul>
        </div>
    )
}

AdminGalleriesPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50,context.query.number)
  });
  const galleries = JSON.stringify(galleriesResponse);
  return {
    props:{
        galleries,
        pageNum:context.query.number
    }
  }
}