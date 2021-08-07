const express= require("express");
const request= require("request");
const parser= require("body-parser");
const https= require("https");
const app= express();
app.use(parser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var name= req.body.FirstName;
  var surname= req.body.LastName;
  var email= req.body.Email;
  var data={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:name,
          LNAME:surname

        }
      }
    ]
  }
  var mydata= JSON.stringify(data);
  var url="https://us5.api.mailchimp.com/3.0/lists/6f9cb60225?update_existing:true";
  var options={
    method:"POST",
    auth:"AdityaThakar8:bd976946c823b8bddcc4f5bdb7fe7387-us5"
  };
  const request= https.request(url,options,function(response){
    response.on("data",function(data){
      var newdata= JSON.parse(data);
      console.log(newdata);

      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
    });
  });
  request.write(mydata);
  request.end();
});

app.listen(process.env.PORT || 3000,function(){
  console.log("the server is up and running on port 3000")
});
