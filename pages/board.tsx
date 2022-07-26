import { useEffect } from "react";

import Gallery from "@/components/gallery/Gallery";
import { setPropsToStore } from "helpers/setPropsToStore";
import excuteQuery from "lib/db";
import { selectGalleryImagesByGalleryId } from "lib/queries";
import { createServerSideProps } from "page/server-side-props";
import { HomePageProps } from "pages";
import { useDispatch } from "store/hooks";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, labels, locale } }) => {
    // ABOUT INFO ( texts & gallery)
    const aboutInfoResponse = await excuteQuery({
      query: `SELECT * FROM js_about_info LIMIT 1`,
    });
    const galleryId = await aboutInfoResponse[0].about_gallery_id;
    const galleryImages = await excuteQuery({
      query: selectGalleryImagesByGalleryId(galleryId),
    });
    // POSTS
    return {
      props: {
        navItems,
        galleryImages: JSON.stringify(galleryImages),
        locales: context.locales,
        locale,
        defaultLocale: context.defaultLocale,
        labels,
      },
    };
  }
);

const Board: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();

  const galleryImages = JSON.parse(props.galleryImages);

  useEffect(() => {
    setPropsToStore(props, dispatch);
  }, []);

  return (
    <main>
      {galleryImages?.length > 0 && (
        <Gallery images={JSON.parse(props.galleryImages)} />
      )}
    </main>
  );
};

Board.layout = "main";

export default Board;
