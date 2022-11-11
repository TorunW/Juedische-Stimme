import AdminTopBar from "@/components/atoms/AdminTopBar";
import { useState } from "react";
import { useSelector } from "store/hooks";

const PostsHeader = () => {
  const { categories, categoryName } = useSelector((state) => state.categories);
  const tabs = categories.map((cat) => cat.name);
  const currentTab = tabs.find((tab) => tab === categoryName);
  return (
    <AdminTopBar
      title="Posts List"
      tabs={tabs}
      currentTab={currentTab}
      customTabClickHandler={(val) =>
        (window.location.href = `/admin/posts/category/${val}/page/1`)
      }
    />
  );
};

export default PostsHeader;
