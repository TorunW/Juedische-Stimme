import { setAboutInfo } from "store/aboutinfo/aboutinfoSlice";
import { setLanguages } from "store/languages/languagesSlice";
import { setMenuItems } from "store/nav/navSlice";
import { setPosts } from "store/posts/postsSlice";

import { setHeaderGallery } from "store/galleries/galleriesSlice";

import { setLabels } from "store/labels/labelsSlice";
import { LayoutPageProps } from "types/LayoutPageProps.type";

export const setPropsToStore = (props: LayoutPageProps, dispatch) => {
  if (props.navItems) dispatch(setMenuItems(JSON.parse(props.navItems)));
  if (props.headerGallery)
    dispatch(setHeaderGallery(JSON.parse(props.headerGallery)[0]));
  if (props.posts) dispatch(setPosts(JSON.parse(props.posts)));
  if (props.aboutInfo) {
    dispatch(
      setAboutInfo({
        aboutInfo: JSON.parse(props.aboutInfo)[0],
        gallery: JSON.parse(props.gallery)[0],
      })
    );
  }
  if (props.locales) {
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }
  if (props.labels) dispatch(setLabels(JSON.parse(props.labels)));
};
