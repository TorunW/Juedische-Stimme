// import styles from 'styles/Home.module.css'
import AdminTopBar from "@/components/atoms/AdminTopBar";
import HeaderForm from "components/admin/HeaderForm";
import excuteQuery from "lib/db";
import {
  selectGalleries,
  selectGalleryById,
  selectGalleryImagesByGalleryId,
} from "lib/queries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGalleries } from "store/galleries/galleriesSlice";

export default function HeaderPage(props) {
  // header slogan
  // slogan translation
  // gallery, if 1 image single gallery, if several slider
  return (
    <HeaderForm
      aboutInfo={JSON.parse(props.aboutInfo)[0]}
      gallery={JSON.parse(props.gallery)}
    />
  );
}

HeaderPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const aboutInfoResponse = await excuteQuery({
    query: `SELECT * FROM js_about_info LIMIT 1`,
  });
  const aboutInfo = JSON.stringify(aboutInfoResponse);

  const GALLERY_ID = 6;
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
