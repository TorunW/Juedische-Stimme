import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const prices = await stripe.prices.list({
        limit: 100,
      });

      const products = await stripe.products.list({
        limit: 100,
        active: true,
      });

      const groups = prices.data.reduce((groups, item) => {
        if (item.active === true) {
          const group = groups[item.product.toString()] || [];
          const price = {
            ...item,
            name: products.data.find((pr) => pr.id === item.product)?.name,
          };
          group.push(price);
          groups[item.product.toString()] = group;
        }
        return groups;
      }, {});

      let groupsArray = [];
      for (var i in groups) {
        groupsArray.push(groups[i]);
      }

      res.json(groupsArray);
    } else {
      res.json({ message: "ONLY GET HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
