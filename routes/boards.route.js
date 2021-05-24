const express = require("express");

//Models
const Board = require("../database/models/Board");

let router = express.Router();

router.route("/new/:id").post(async (req, res) => {
  try {
    const newBoard = new Board();

    if (!newBoard) {
      return res.status(400).json("Board Not Created");
    }

    newBoard.created_by = req.params.id;
    newBoard.title = req.body.title;
    console.log(newBoard);
    const boardToSendBack = await newBoard.save();

    return res.status(200).json(boardToSendBack);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/allby/:id").get(async (req, res) => {
  try {
    const getAllBoard = await Board.find({ created_by: req.params.id });

    if (!getAllBoard) {
      return res.status(404).json("Board Not Found");
    }

    return res.status(200).json(getAllBoard);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const getAllBoard = await Board.findByIdAndDelete(req.params.id);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
