const router = require("express").Router();
const projects = require("../data/helpers/projectModel");

//Retrieve all projects ✅
router.get("/", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Can't retrieve projects" });
    });
});

//Returns individual project and action ✅
router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Can't retrieve projects" });
    });
});

//Creating a new Project ❌
router.post("/", (req, res) => {
  console.log("\n", req.body);
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ Error: "Name and body required" });
  } else {
    projects
      .insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(() => {
        res
          .status(500)
          .json({ Error: "There was an error creating your Project" });
      });
  }
});

//Edit a project details ❌
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updateProject = req.body;
  console.log(req.body);
  if (!id) {
    res
      .status(404)
      .json({ Error: "The project with the specified ID does not exist." });
  } else if (!updateProject.name || !updateProject.description) {
    res.status(400).json({ Error: "Please provide a name and description" });
  } else {
    projects
      .update(id, updateProject)
      .then(project => {
        console.log(project);
        res.status(200).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ Error: "unable to update the project" });
      });
  }
});

//Deleting a project ✅
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(404)
      .json({ Error: "The project with the specified ID does not exist." });
  } else {
    projects
      .remove(id)
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ Error: "Unable to delete Project" });
      });
  }
});

module.exports = router;
