import dbConnect from "../../lib/db";
import { getSession } from "next-auth/client";
import quoteModel from "../../lib/quoteModel";

export default async function handler(req, res) {
  const session = await getSession({ req });
  switch (req.method.toUpperCase()) {
    case "GET":
      if (session) {
        await dbConnect();
        const quoteDB = await quoteModel.find({});
        const quote = quoteDB[Math.floor(Math.random() * quoteDB.length)];
        res.status(200).json({
          success: true,
          data: quote,
        });
      } else {
        res.status(401).send("Not Signed in");
      }
      break;
    case "POST":
      const fetchData = await (
        await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
      ).json();
      console.log(fetchData)
      await quoteModel.create({
        quote: fetchData.quotes[0].text,
        author: fetchData.quotes[0].author,
      });
      res.status("201").json({
        success: true,
        message: "Created Quote",
        data: fetchData,
      });
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
