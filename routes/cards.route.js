const express = require("express");

//Model
const Card = require("../database/models/Card");
const List = require("../database/models/List");

let router = express.Router();

router.route("/new/:id").post(async (req, res) => {
  try {
    const newCard = new Card(req.body);

    if (!newCard) {
      return res.status(400).json("Could Not Create A Card");
    }

    const listToEdit = await List.findById(req.params.id);

    if (!listToEdit) {
      return res.status(400).json("Could Not Create A Card");
    }

    listToEdit.cards.push(newCard._id);

    await listToEdit.save();

    const cardSaved = await newCard.save();

    return res.status(200).json(cardSaved);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/edit/:id").put(async (req, res) => {
  try {
    console.log(req.body);
    const cardToEdit = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    console.log(cardToEdit);

    if (!cardToEdit) {
      return res.status(400).json("Could Not Edit A Card");
    }

    return res.status(200).json(cardToEdit);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/allcardsbylist/:id").get(async (req, res) => {
  try {
    const getList = await List.findById(req.params.id);

    if (!getList) {
      return res.status(400).json("Could Not Find cards");
    }

    const getCards = await Card.find({ _id: { $in: getList.cards } });

    if (!getCards) {
      return res.status(400).json("Could Not Find cards");
    }

    return res.status(200).json(getCards);
  } catch (error) {
    return res.status(500).json({ error });
  }
});
router.route("/deleteby/:id").delete(async (req, res) => {
  try {
    const getList = await Card.findByIdAndDelete(req.params.id);

    if (!getList) {
      return res.status(400).json("Could Not Find card");
    }

    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/moveto").put(async (req, res) => {
  try {
    const getListFrom = await List.findById(req.body.fromListId);

    if (!getListFrom) {
      return res.status(400).json("Could Not Move Card");
    }

    const getListTo = await List.findById(req.body.toListId);

    if (!getListTo) {
      return res.status(400).json("Could Not Find List");
    }

    const getCardToMove = await Card.findById(req.body.cardId);

    if (!getCardToMove) {
      return res.status(400).json("Could Not Find card");
    }

    const cardIdx = getListFrom.cards.findIndex((x) => x == req.body.cardId);
    getListFrom.cards.splice(cardIdx, 1);
    const listFromSaved = await getListFrom.save();
    getListTo.cards.push(getCardToMove);
    const listToSaved = await getListTo.save();

    return res.status(200).json({ listFromSaved, listToSaved });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
