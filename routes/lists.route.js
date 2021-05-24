const express = require("express");

//Model
const List = require("../database/models/List");
const Card = require("../database/models/Card");

let router = express.Router();

router.route("/new").post(async (req, res) => {
  try {
    const newList = new List(req.body);

    if (!newList) {
      return res.status(400).json("Could Not Create a list");
    }

    if (newList.isCopy) {
      if (newList.title.includes("(Copied)")) {
        newList.title.replace("(Copied)", "");
      } else {
        newList.title = `${req.body.title} - (Copied)`;
      }
      if (newList.cards.length > 0) {
        const cardsToCopy = await Card.find({ _id: { $in: newList.cards } });

        const cardsToCopyMapped = cardsToCopy.map((x) => {
          return {
            content: x.content,
          };
        });

        const cardsToSave = await Card.insertMany(cardsToCopyMapped);
        newList.cards = cardsToSave;
      }
    }

    const listSaved = await newList.save();

    return res.status(200).json(listSaved);
  } catch (error) {
    return res.statu(500).json({ error });
  }
});

router.route("/deletewithid/:id").delete(async (req, res) => {
  try {
    const listDeleted = await List.findByIdAndDelete(req.params.id);
    const deleteCardsInList = await Card.deleteMany({
      _id: { $in: listDeleted.cards },
    });

    return res.status(200).json("ok");
  } catch (error) {
    return res.statu(500).json({ error });
  }
});

router.route("/allby/:id").get(async (req, res) => {
  try {
    const allListByBoard = await List.find({
      isListOf: req.params.id,
    }).populate("cards");

    if (allListByBoard.length < 1) {
      return res.status(200).json([]);
    }

    console.log(allListByBoard, "finalToSend");

    return res.status(200).json(allListByBoard);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/edit/:id").put(async (req, res) => {
  try {
    const listEdited = await List.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("cards");

    if (!listEdited) {
      return res.status(400).json("Could Not Update List");
    }

    return res.status(200).json(listEdited);
  } catch (error) {
    return res.statu(500).json({ error });
  }
});

module.exports = router;
