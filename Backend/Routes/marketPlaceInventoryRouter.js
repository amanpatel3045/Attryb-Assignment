const express = require("express");
const { InventoryModel } = require("../Models/inventoryModel.js");
const { oemSpecsModel } = require("../Models/oemSpecsModel.js");
const { userRelationShip } = require("../Middlewares/userRelationship.js");
const invetoryRouter = express.Router();


invetoryRouter.post("/inventory", async (req, res) => {
  try {
    let newInventoryModal = InventoryModel(req.body);
    await newInventoryModal.save();
    res.status(200).send({ msg: "Deal Added Successs" });
  } catch (error) {
    res.send({ error });
  }
});
