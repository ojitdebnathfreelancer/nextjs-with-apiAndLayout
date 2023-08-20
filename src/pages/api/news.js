const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://commonDb:commonDb123@cluster0.r7d25w3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    await client.connect();
    const newsCollection = client.db("newsDb").collection("news");

    if (req.method === "GET") {
      const news = await newsCollection.find({}).toArray();
      res.send({
        message: "Success",
        status: 200,
        data: news,
      });
    }

    if (req.method === "POST") {
      const news = req.body;
      const result = await newsCollection.insertOne(news);
      res.send(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export default run;
