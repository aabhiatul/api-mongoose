const express = require("express");
require("./config");
const Products = require("./products");

const app = express();

app.use(express.json());

app.post("/create", async (req, res) => {
  let result = new Products(req.body);
  let data = await result.save();
  // if(data.acknowedged == true){
  //     console.log("done")
  // }
  console.log(data);
  res.send(req.body);
});
app.get("/getData", async (req, res) => {
  let result = await Products.find();
  res.send(result);
});
app.delete("/delete/:_id", async (req, res) => {
  let data = await Products.deleteOne(req.params);
  res.send("delete successfully!");
});
app.put("/update/:_id", async (req, res) => {
  let data = await Products.updateOne(req.params, {
    $set: { name: req.body.name },
  });
  res.send("update successfully!");
});

app.listen(8000, () => {
  console.log("running on port 8000");
});
