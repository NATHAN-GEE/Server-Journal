// const Express = require('express');
// const router = Express.Router();
const { restart } = require("nodemon");
const { PieModel } = require("../Blue-Badge/Eleven-Journal/server/models");
const Pie = require("../Blue-Badge/Eleven-Journal/server/models/pie");
const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.send(`Main route Hit!`);
// });

router.get("/", async (req, res) => {
  try {
    const allPies = await PieModel.findAll();
    res.status(200).json(allPies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  const { nameOfPie, baseOfPie, crust, timeToBake, servings, rating } =
    req.body;
  try {
    const Pie = await PieModel.create({
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      rating,
    });
    res.status(201).json({
      message: "Pie successfully created!",
      Pie,
    });
  } catch (err) {
    res.status(500).json({
      messsage: `Failed to create pie: ${err}.`,
    });
  }
});

// findOne()
router.get("/:name", async (req, res) => {
  try {
    const locatedPie = await PieModel.findOne({
      where: {
        nameOfPie: req.params.name,
      },
    });
    res.status(200).json({
      message: "Pies successfully retrieved",
      locatedPie,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve pies: ${err}`,
    });
  }
});

// update()
router.put("/:id", async (req, res) => {
  const { nameOfPie, baseOfPie, crust, timeToBake, servings, rating } =
    req.body;
  try {
     await PieModel.update(
       { nameOfPie, baseOfPie, crust, timeToBake, servings, rating },
       { where: { id: req.params.id } },

       (updatedPie = {
         nameOfPie,
         baseOfPie,
         crust,
         timeToBake,
         servings,
         rating,
       })
     );
    res.status(200).json({
      message: "Pie successfully updated",
      updatedPie: updatedPie,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update pie: ${err}`,
    });
  }
});
//Delete

router.delete("/:id",  async (req, res) => {
  const pieId = req.params.id;
  const pieName = req.body.nameOfPie
  try {
    const deleteId = {
      where: {
        id: pieId,
      },
    };
    await PieModel.destroy(deleteId);
    res.status(200).json({
      message: `The pie ${pieName} was deleted`,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
