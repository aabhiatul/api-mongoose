const express = require("express");
const multer = require('multer')
const os = require('os')

require("./config");
const Products = require("./products");


const app = express();

const upload = multer({
  storage:multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"uploads")
    },
    filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+".jpeg")
    }
  })
}).single("user_file")

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

app.get("/search/:key", async (req, res) => {
  let data = await Products.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
    ],
  });
  res.send(data);
});

app.post("/uploadfile", upload ,async (req, res) => {
  res.send("file uploaded successfully!");
});

app.listen(8000, () => {
  console.log("running on port 8000",os.userInfo());
});
