import React from "react";
import styles from "./Styles.module.css";
import ContactForm from "../forms/ContactForm";
import { useSelector } from "store/hooks";
import { Container } from "../atoms/Container";
import { Box } from "@mui/system";

export const Footer = () => {
  const { footerMenu } = useSelector((state) => state.nav);

  return (
    <footer id={styles.footer}>
      <Container>
        <div className={styles.topRow}>
          <ContactForm />
        </div>
        <div className={styles.bottomRow}>
          <Box marginBottom={3}>
            copyright © 2022 JÜDISCHE STIMME für gerechten frieden in nahost,
            berlin seit 2007.
          </Box>
          <p>
            {footerMenu.map((mi, index) => (
              <React.Fragment key={mi.title}>
                <a href={mi.link}>{mi.title}</a>

                {index + 1 < footerMenu.length ? (
                  <span style={{ margin: "0 5px" }}>●</span>
                ) : (
                  ""
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
