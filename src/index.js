const express = require("express");
const route = require("./routes/routes");
const mongoose = require("mongoose");
const cors=require("cors")
const app = express();

// app.use(express.json());
app.use(express.json());
app.use(cors())
// app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://shubham108h:LOhyTHS7kcSijNsz@cluster0.ovhwygy.mongodb.net/shubham108h",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDb is connected..."))
  .catch((err) => console.log(err));

app.use("/", route);

const port = 3001;
app.listen(port, function () {
  console.log(`Express app is connected ${port}`);
});
