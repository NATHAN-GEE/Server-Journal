const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { JournalModel } = require("../models");
router.get("/practice", validateJWT, (req, res) => {
  //sometimes called a handler function
  res.send("Hey!! This is a practice route");
});

/*
==================
JOURNAL ENTRY
==================
*/
router.post("/create", validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const { id } = req.user;
  const journalEntry = {
    title,
    date,
    entry,
    owner: id,
  };
  try {
    const newJournal = await JournalModel.create(journalEntry);
    res.status(200).json(newJournal);
  } catch {
    res.status(500).json({ error: err });
  }
  JournalModel.create(journalEntry);
});

router.get("/about", (req, res) => {
  res.send("This is the about route!");
});

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const userJournals = await JournalModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userJournals);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const results = await JournalModel.findAll({
      where: { title: title },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:entryId", validateJWT, async (req, res) => {
  const { title, entry, date } = req.body.journal;
  const jounalId = req.params.entryId;
  const userId = req.user.id;
  const query = {
      where: {
        id: journalId,
        owner: userId,
      },
    },
    updatedJournal = {
      title: title,
      date: date,
      entry: entry,
    };
  try {
    const update = await JournalModel.update(updatedJournal, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const journalId = req.params.journal;
  try {
    const query = {
      where: {
        id: journalId,
        owner: ownerId,
      },
    };
    await JournalModel.destroy(query);
    res.status(200).json({
      message: `The journal entry was deleted`,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
