import CategoryForm from 'components/admin/CategoryForm';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function CreateCategoryPage() {
  return (
    <div>
      <AdminTopBar title='Create new Category' />
      <CategoryForm />
    </div>
  );
}

CreateCategoryPage.layout = 'admin';
