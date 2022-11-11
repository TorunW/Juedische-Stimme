import React from "react";

import { Container } from "../atoms/Container";

const FacebookFeed = () => {
  return (
    <Container sx={{ paddingX: "20px", textAlign: "center" }}>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F12juedischestimme%2F&tabs=timeline&width=1067px&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=788247842185302"
        width="500"
        height="500"
        style={{
          border: "none",
          overflow: "hidden",
          margin: "20px auto",
          display: "table",
        }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </Container>
  );
};

export default FacebookFeed;
