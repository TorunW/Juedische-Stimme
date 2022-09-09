import GalleryForm from 'components/admin/galleries/GalleryForm';
import styles from 'styles/Home.module.css'

export default function CreateGalleryPage() {
  return (
    <div className={styles.container}>
        <h2>NEW GALLERY</h2>
        <GalleryForm/>
    </div>
  )
}

CreateGalleryPage.layout = "admin";