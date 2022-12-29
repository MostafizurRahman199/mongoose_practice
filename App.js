const mongoose = require("mongoose");
const express = require("express");
const app = express();

//connection creation and create a new DB
mongoose.connect(
  "mongodb://127.0.0.1:27017/ttchannel",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected");
    }
  }
);

//Schema
//A Mongoose schema defines the structure of the document,
//default values, validations, etc...

app.listen(3000, () => {
  console.log("on port 3000 !!!");
});

//Schema

const playListSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true,
    unique:true,
    // lowercase : true
    uppercase:true,
    trim:true,
    minlength:2,
    maxlength:30
    },
  ctype: {
    type:String,
    enum:['frontend', 'backend', 'database'],
    lowercase: true,
    required : true
  
  },
  videos: {
  type : Number,
  validate(value)
  {
    if(value < 0 )
    {
      throw new Error("Negative number can't be allowed")
    }
//  validate :{
//     validator: function(value){
//       return value.length < 0 
//     },
//     message: "videos no. should not be negative"
//  }

  }},
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//collection creation
const Playlist = new mongoose.model("Playlist", playListSchema);

//create  document

const createDocument = async () => {
  try {
    // const reactPlaylist = new Playlist({
    //   name: "Node js",
    //   ctype: "BackEnd",
    //   videos: 88,
    //   author: "Thapa",
    //   active: true,
    // });
    // const expressPlaylist = new Playlist({
    //   name: "Express js",
    //   ctype: "BackEnd",
    //   videos: 88,
    //   author: "Thapa",
    //   active: true,
    // });
    // const mongodbPlaylist = new Playlist({
    //   name: "MongoDB",
    //   ctype: "Database",
    //   videos: 25,
    //   author: "Thapa",
    //   active: true,
    // });
    const mongoosePlaylist = new Playlist({
      name: "MYSQL",
      ctype: "Database",
      videos: -20,
      author: "Thapa",
      active: true,
   
    });

    // const javascriptPlaylist = new Playlist({
    //   name: "javascript",
    //   ctype: "Full stack",
    //   videos: 90,
    //   author: "Thapa",
    //   active: true,
    // });

    const result = await Playlist.insertMany([
      mongoosePlaylist,
      // mongodbPlaylist,
      // expressPlaylist,
      // reactPlaylist,
      // javascriptPlaylist,
    ]);

    console.log(result);

  } catch (err) {
    console.log(err);
  }
};

const getDocument = async () => {
  try {
    const result = await Playlist.find({
      ctype: { $in: ["BackEnd", "Database"] },
    })
      // .find({$and : [{ctype : "Database" }, {author:"Mostafiz"}]})
      // .find({$or : [{ctype : "BackEnd"}, {videos: 20}]})
      // .select({name:1}).countDocuments();
      .select({ name: 1 })
      .sort({ name: -1 });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },

      {
        $set: { name: "JavaScript <3<3" },
      },{
        new : true,
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};


const deleteDocument = async (_id) =>{
   try {
    // const result = await Playlist.deleteOne({_id});
    const result = await Playlist.findByIdAndUpdate({_id});
   console.log(result);
   } catch (error) {
    console.log(error);
   }
}


// deleteDocument("63aa40db4b86c05e797ccca1");
// updateDocument("63aa40db4b86c05e797ccca5");

createDocument();
// getDocument();
