// import styles from 'styles/Home.module.css'
import AdminTopBar from "@/components/atoms/AdminTopBar";
import AboutInfoForm from "components/admin/AboutInfoForm";
import excuteQuery from "lib/db";
import { selectGalleryById, selectGalleryImagesByGalleryId } from "lib/queries";

export default function AboutInfoPage(props) {
  return (
    <AboutInfoForm
      aboutInfo={JSON.parse(props.aboutInfo)[0]}
      gallery={JSON.parse(props.gallery)}
    />
  );
}

AboutInfoPage.layout = "admin";

export const getServerSideProps = async (context) => {
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
    },
  };
};
