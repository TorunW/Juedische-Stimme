import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { price, quantity, mode } = req.body;
  console.log(req.body, 'BODYYYYYY');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'giropay'],
    line_items: [
      {
        price,
        quantity,
      },
    ],

    mode,
    // billing_address_collection: 'required',
    // customer_email: 'required',
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/spenden`,
  });
  res.status(200).json({ sessionId: session.id });
};
