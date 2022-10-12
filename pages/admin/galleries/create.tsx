import AdminTopBar from '@/components/atoms/AdminTopBar';
import GalleryForm from 'components/admin/galleries/GalleryForm';

export default function CreateGalleryPage() {
  return (
    <div>
      <AdminTopBar title='Create New Gallery' />
      <GalleryForm />
    </div>
  );
}

CreateGalleryPage.layout = 'admin';
