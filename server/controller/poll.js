const Poll = require("../models/poll")
var mongoose = require('mongoose');

const create = async (req, res, next) => {
    // io.sockets.in(room).emit('event', data);
    try {
        if (!req.body.question || !req.body.options) {
            res.json({
                status: false,
                message: "Some Fields are unfilled"
            })
        } else {
            let length = req.body.options.length
            console.log(length);
            let count = Array(length).fill(0);
            console.log(count);
            let newPoll = new Poll({
                question: req.body.question,
                options: req.body.options,
                vote_count: count,
                voters: [],
                end: req.body.end
            })
            const new_poll = await newPoll.save();
            res.json({
                status: true,
                message: "poll created",
                poll_id: new_poll._id
            })
            }
    } catch (err) {
        res.json({
            status: false,
            message: "Failed" + err.message
        })
    }
}

const getPoll = async (req, res, next) => {
    try {
        var objectId = mongoose.Types.ObjectId(req.query.id);
        let poll = await Poll.findById(objectId);
        if (poll) {
            res.json({
                status: true,
                message: "You Can Vote Now",
                poll: poll
            })
        } else {
            res.json({
                status: false,
                message: "Error Getting Poll or Poll Not Found"
            })
        }
    } catch (err) {
        res.json({
            status: false,
            message: "Failed" + err.message
        })
    }
}

const updatePoll = async (req, res, next) => {
    try {
        const io = req.app.get('socketio');
        const poll = await Poll.findOne({ _id: req.body.sno });
        if (poll) {
            const updatePoll = poll;
            updatePoll.vote_count[poll.options.indexOf(req.body.option)] += 1;
            await Poll.findOneAndUpdate({ _id: req.body.sno }, updatePoll, {
            new: true,
            runValidators: true,
            })
            let lol = await Poll.findOne({ _id: req.body.sno });
            io.sockets.in(req.body.sno).emit('voted', lol);
            res.json({
                status: true,
                message: "You Voted",
                poll: lol
            })
        }
    } catch (err) {
        res.json({
            status: false,
            message: "Failed" + err.message
        })
    }
}

module.exports = { create, getPoll, updatePoll }