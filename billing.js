import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import calculateCost from "./libs/billing-lib";


export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Test charge.";

  console.log("YOOOOO");
  console.log(process.env.stripeSecretKey);
  const stripe = stripePackage(process.env.stripeSecretKey);

  const response = await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
  });

  return { response };
  //return { status: true };
});
