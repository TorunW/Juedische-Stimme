import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { useDispatch, useSelector } from 'react-redux';

import Post from 'components/Post';
import { selectPostByName } from 'lib/queries/posts';
import { selectNavItems } from 'lib/queries';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { NextPageContext } from 'next';

const ContentPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
  }, []);
  let page = JSON.parse(props.page)[0];

  return (
    <div>
      <Post post={page} />
    </div>
  );
};

ContentPage.layout = 'main';

export const getServerSideProps = async (context: NextPageContext) => {
  const navItemsResponse = await excuteQuery({
    query: selectNavItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  const pageResponse = await excuteQuery({
    query: selectPostByName({ name: context.query.name }),
  });
  const page = JSON.stringify(pageResponse);

  return {
    props: {
      page,
      navItems,
    },
  };
};

export default ContentPage;
