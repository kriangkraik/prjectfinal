const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/* Route Download File PDF */
router.get("/", function (req, res) {
  var filename = req.query.filename;

  try {
    var file = fs.readFileSync(
      path.resolve(__dirname, "../export_filepdf/" + filename),
      "binary"
    );
    res.setHeader("Content-Length", file.length);
    res.write(file, "binary");
    res.end();
  } catch (err) {
    res.status(500).send("Error: FileNotFound");
  }
});

router.post("/", function (req, res) {
  const index = require("../indexpdf");

  var sheet = req.body.sheet;
  var parish = req.body.parish;
  var address = req.body.address;
  var pageservay = req.body.pageservay;
  var district = req.body.district;
  var titledeednumber = req.body.titledeednumber;
  var title = req.body.title;
  var at = req.body.at;
  var province = req.body.province;
  var datecreate = req.body.datecreate;
  var monthcreate = req.body.monthcreate;
  var yearcreate = req.body.yearcreate;
  var own = req.body.own;
  var idn1 = req.body.idn1;
  var idn2 = req.body.idn2;
  var idn3 = req.body.idn3;
  var idn4 = req.body.idn4;
  var idn5 = req.body.idn5;
  var idn6 = req.body.idn6;
  var idn7 = req.body.idn7;
  var idn8 = req.body.idn8;
  var idn9 = req.body.idn9;
  var idn10 = req.body.idn10;
  var idn11 = req.body.idn11;
  var idn12 = req.body.idn12;
  var idn13 = req.body.idn13;

  var now = new Date();
  index.generatePdf(
    {
      fields: {
        Text1: sheet,
        Text2: parish,
        Text3: address,
        Text4: pageservay,
        Text5: district,
        Text6: titledeednumber,
        Text7: province,
        Text8: title,
        Text9: at,
        Text10: datecreate,
        Text11: monthcreate,
        Text12: yearcreate,
        Text13: own,
        Text14: idn1,
        Text15: idn2,
        Text16: idn3,
        Text17: idn4,
        Text18: idn5,
        Text19: idn6,
        Text20: idn7,
        Text21: idn8,
        Text22: idn9,
        Text23: idn10,
        Text24: idn11,
        Text25: idn12,
        Text26: idn13,
      },
    },
    "./templatepdf/หนังสือมอบอำนาจที่ดิน.pdf",
    "THSarabunNew",
    { fontSize: 14 },
    "./export_filepdf/" +
      "File_" +
      now.getFullYear() +
      "-" +
      now.getMonth() +
      "-" +
      now.getDate() +
      ".pdf",
    function (error, stdout, stderr) {
      if (error) {
        res.status(500).send({
          statuscode: 500,
          message: "Error Cannot create pdf file!",
        });
      } else {
        res.status(200).send({
          statuscode: 200,
          message: "Ok create pdf file successfully!",
          urlfile:
            "http://localhost:3000/pdfautofill?filename=" +
            "File_" +
            now.getFullYear() +
            "-" +
            now.getMonth() +
            "-" +
            now.getDate() +
            ".pdf",
        });
      }
    }
  );
});

module.exports = router;
