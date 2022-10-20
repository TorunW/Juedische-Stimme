import HeaderForm from "components/admin/HeaderForm";
import excuteQuery from "lib/db";
import { selectGalleryById, selectGalleryImagesByGalleryId } from "lib/queries";
import { useLoggedUserCookie } from "pages/hooks/useLoggedUser";

export default function HeaderPage(props) {
  return (
    <HeaderForm
      aboutInfo={JSON.parse(props.aboutInfo)[0]}
      gallery={JSON.parse(props.gallery)}
    />
  );
}

HeaderPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const loggedUser = await useLoggedUserCookie({
    req: context.req,
    res: context.res,
  });
  if (!loggedUser) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

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
      loggedUser,
      aboutInfo,
      gallery,
    },
  };
};
