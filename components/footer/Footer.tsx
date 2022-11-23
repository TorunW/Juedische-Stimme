import React from "react";
import styles from "./Styles.module.css";
import ContactForm from "../forms/ContactForm";
import { useSelector } from "store/hooks";
import { Container } from "../atoms/Container";
import { Box } from "@mui/system";
import { getLabel } from "helpers/getLabelHelper";
import Link from "next/link";

export const Footer = () => {
  const { footerMenu } = useSelector((state) => state.nav);

  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  return (
    <footer id={styles.footer}>
      <Container>
        <div className={styles.topRow}>
          <ContactForm />
        </div>
        <div className={styles.bottomRow}>
          <Box marginBottom={3}>
            {getLabel(
              labels,
              locale,
              "copyright_text",
              `copyright © 2022 JÜDISCHE STIMME für gerechten frieden in nahost,
            berlin seit 2007.`
            )}
          </Box>
          <p>
            {footerMenu.map((mi, index) => (
              <React.Fragment key={mi.link}>
                <Link
                  key={mi.title}
                  href={
                    "/" + (mi.link && mi.link !== null ? mi.link : mi.post_name)
                  }
                >
                  {locale === "en_US" && mi.title_en_US
                    ? mi.title_en_US
                    : mi.title}
                </Link>

                {index + 1 < footerMenu.length && (
                  <span style={{ margin: "0 5px" }}>●</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
