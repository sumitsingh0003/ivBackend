const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //Library for checking the validation of the the input at the time of the authentic ation
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  }
});





// Route 1 :Add a new note using - Post "/api/notes/addnote" . Login Required
router.post("/addnote", upload.single('Info[img]'), fetchuser,
  [
    body("data", "Enter a valid data"),
    // body("id", "Enter a valid id"),
  ],
  async (req, res) => {
    // console.log("req", req);
    try {
      // const { data } = req.body;
      const { subTotalData } = req.body;
      // const img = req.file.filename;
      const items = JSON.parse(req.body.items);
      const { imgName, ...NewInfo } = req.body.Info;
      const url = req.protocol + '://' + req.get('host');
      const imgDataName = url + "/images/" + req.file.filename;
      const Info = { ...NewInfo, imgDataName };
      // getting data from res.body by destructuring
      // If there are errors , return bad errors and the errors
      // console.log("req", req.body);
      console.log("imgName", imgDataName);
      // console.log("img", img);
      // console.log("url", url);
      console.log("items", items);
      console.log("Info", Info);
      console.log("subTotalData", subTotalData);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        // Ye saari cheeze hum apne new note me add karenge
        data: { Info, items, subTotalData }, user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);







// Route 2 : Get All notes using - GET "/api/notes/fetchnotes" . Login Required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    // console.log(req.user.id,"Notes,user");
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Serval Error Occured");
  }
});








// Using put - Because when we update an existing thing we use put
// Route 3 : Update an existing Note using - Put "/api/notes/updatenote" . Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { data } = req.body;
    // Creating a newNote Object
    const newNote = {};
    if (data) {
      newNote.data = data;
    }
    // if (description) {
    //   newNote.description = description;
    // }
    // if (tag) {
    //   newNote.tag = tag;
    // }

    // Find the note to be updated and update it
    //  const note = Note.findByIdAndUpdate()
    // Ye nhi karenge kyuki isme koi bhi kisika note change kar sakta hai kyuki isme user ki id or edit karne wale ki id ko humne verify nhi kiya hai ki wo dono ek hi bande hai ya nhi

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //  note.user.toString() -- Us note ki id hai jo edit ho rha hai 
    //  req.user.id -- edit karne wale ki id hai 
    //  hum jab note ko add karte hai tab hum us note ko id dete hai or us note me uske user ki id bhi daalte hai
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed to update");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Serval Error Occured");
  }

});










// Using Delete - Because when we update an existing thing we use put
// Route 4 : Deleting an existing Note using - Delete "/api/notes/deletenote" . Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be Deleted and delete it
    //  const note = Note.findByIdAndDelete()
    // Ye nhi karenge kyuki isme koi bhi kisika note delete kar sakta hai kyuki isme user ki id or edit karne wale ki id ko humne verify nhi kiya hai ki wo dono ek hi bande hai ya nhi

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //  note.user.toString() -- Us note ki id hai jo edit ho rha hai 
    //  req.user.id -- edit karne wale ki id hai 
    //  hum jab note ko add karte hai tab hum us note ko id dete hai or us note me uske user ki id bhi daalte hai
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed to delete");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    // res.json({ note });
    res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Serval Error Occured");
  }

});














module.exports = router;





// // Route 1 :Add a new note using - Post "/api/notes/addnote" . Login Required
// router.post("/addnote", upload.single('file'), fetchuser,
//   [
//     body("data", "Enter a valid data"),
//     // body("id", "Enter a valid id"),
//   ],
//   async (req, res) => {
//     console.log("req");

//     try {
//       const data = req.body;
//       // const { data } = req.body;
//       // const { img, name } = data;
//       // const { img } = req.file;
//       // const items = JSON.parse(req.body.items);
//       // getting data from res.body by destructuring
//       // If there are errors , return bad errors and the errors
//       console.log("req", req.body);
//       // console.log("formData", formData);
//       // console.log("img", img);
//       // console.log("items", items);
//       // console.log("Info", Info);
//       // console.log("subTotalData", subTotalData);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const note = new Note({
//         // Ye saari cheeze hum apne new note me add karenge
//         data, user: req.user.id
//       });
//       const savedNote = await note.save();
//       res.json(savedNote);

//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error Occured");
//     }
//   }
// );
