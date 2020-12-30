const express = require('express');
const router = express.Router();
const PollController = require('../controller/poll')

router.post("/create", PollController.create);

router.get("/get", PollController.getPoll);

router.put("/vote", PollController.updatePoll);

module.exports = router;