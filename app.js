const express = require('express');
const app = express();
const PORT = 5000;
const routes = require('./routes');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

//configure my views and js folders
app.use(express.static("views"));
app.use(express.static("js"));

app.use("/", routes);
app.use("/game", routes);

// app.get('/', function(req, res){
//     return res.send("index.html");
// })

app.listen(PORT, function(error){
   if(error) console.log(error);
   console.log(`SERVER RUNNING ON PORT ${PORT}`);
})


