const router = require("express").Router();
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

//Returns a list of all actions ✅
router.get("/", (req, res) => {
  actions.get().then(actions => {
    res.status(200).json(actions);
  });
});

//Return specific actions for a project ✅
router.get("/:id", (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(400).json({ Error: "Not a valid project ID" });
      }
    })
    .catch(() =>
      res.status(500).json({
        Error: "You messed up"
      })
    );
});

module.exports = router;
