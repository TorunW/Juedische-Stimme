import AboutInfoForm from "components/admin/AboutInfoForm";
import { useLoggedUser } from "hooks/useLoggedUser";
import excuteQuery from "lib/db";
import { selectGalleryById, selectGalleryImagesByGalleryId } from "lib/queries";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const aboutInfoResponse = await excuteQuery({
      query: `SELECT * FROM js_about_info LIMIT 1`,
    });
    const aboutInfo = JSON.stringify(aboutInfoResponse);

    const GALLERY_ID = 5;
    const galleryResponse = await excuteQuery({
      query: selectGalleryById(GALLERY_ID),
    });
    const galleryImagesResponse = await excuteQuery({
      query: selectGalleryImagesByGalleryId(GALLERY_ID),
    });
    const gallery = JSON.stringify({
      ...galleryResponse[0],
      images: galleryImagesResponse,
    });

    return {
      props: {
        aboutInfo,
        gallery,
        loggedUser,
      },
    };
  }
);

export default function AboutInfoPage(props) {
  const {} = useLoggedUser(props);
  return (
    <AboutInfoForm
      aboutInfo={JSON.parse(props.aboutInfo)[0]}
      gallery={JSON.parse(props.gallery)}
    />
  );
}

AboutInfoPage.layout = "admin";
