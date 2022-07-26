import excuteQuery from "lib/db";
import { getLabels } from "lib/queries/labels";
import { selectMenuItems } from "lib/queries/menuItems";
import { GetServerSideProps } from "next";
import { PageProps } from "./page";
// this is the data that is passed into the serverSideProps of each particular page
// useful in case when the amount is huge or contains sensitive data and cannot be sent to the client in PageProps
export interface ServerSideData {
  dataForSSR: string;
  navItems: string;
  labels: string;
  locale: string;
}

// utility type
export interface ServerSidePropsParams<T> {
  props: T;
  data: ServerSideData;
  context: Parameters<GetServerSideProps>[0];
}

// factory for each page's serverSideProps
export const createServerSideProps = <T extends PageProps>(
  fn?: (params: ServerSidePropsParams<T>) => ReturnType<GetServerSideProps>
): GetServerSideProps => {
  return async (context) => {
    try {
      // good place to e.g. set cookie
      // context.res.setHeader('Set-Cookie', '');

      // or to return redirect based on some logic

      // etc.

      // fill in the global data for the page

      // NAVIGATION
      const navItemsResponse = await excuteQuery({
        query: selectMenuItems(),
      });
      const navItems = JSON.stringify(navItemsResponse);

      // LABELS
      const labelsResponse = await excuteQuery({
        query: getLabels(),
      });
      const labels = JSON.stringify(labelsResponse);

      // PAGEVIEW
      const { req } = context;
      if (req.headers.host.indexOf("juedische-stimme") > -1) {
        let url = context.resolvedUrl;
        const fullUrl = `https://${
          req.headers.host +
          (url.indexOf("?") > -1
            ? url.split("?")[url.split("?").length - 2]
            : url)
        }`;
        const forwarded = req.headers["x-forwarded-for"];
        const detectedId = forwarded
          ? forwarded.toString().split(/, /)[0]
          : req.connection.remoteAddress;
        const pageViewResponse = await excuteQuery({
          query: `SELECT * FROM js_pageviews WHERE js_pageviews.ip='${detectedId}' AND js_pageviews.url='${url}'`,
        });

        if (pageViewResponse.length === 0) {
          const insertPageViewResponse = await excuteQuery({
            query: `INSERT INTO js_pageviews ( ip, url) VALUES ('${detectedId}','${fullUrl}')`,
          });
        }
      }

      // LOCALE

      const props = {
        page: {
          serverSideData:
            "global data you want to pass to the global page component",
        },
      } as T;

      // here, if the callback with custom serverSideProps is provided, call it and return what it did
      if (fn) {
        // also possible to do some post-logic after `fn` call before returning the result
        return fn({
          props,
          data: {
            dataForSSR: "data for custom serverSideProps",
            navItems,
            labels,
            locale:
              req.headers.host.indexOf("juedische-stimme.com") > -1
                ? "en_US"
                : "de_DE",
          },
          context,
        });
      }

      return { props };
    } catch (ex) {
      // good place to handle global errors

      console.error(ex);

      throw ex;
    }
  };
};
