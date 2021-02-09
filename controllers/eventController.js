const db = require("../models");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining methods for the eventController
module.exports = {
    // Get details of the input event ID
    getEventInfo: function(req, res) {
        let eventID = req.params.eventId;
        db.Event
        .find({_id: eventID})
        .populate("children")
        .then(dbEvent => res.json(dbEvent))
        console.log(dbEvent);
    },
    // Create a new Event document
    create: function(req, res) {
        // console.log(req.body);
        let eventDetails = req.body.event;
        let parent1 = req.body.parent1;
        let parent2 = req.body.parent2;
        db.Event
        .create(eventDetails)
        .then(({_id}) => db.User
                            .updateMany({uid: { $in: [parent1, parent2]}}, { $push: { playdate: _id } }, { new: true }) 
                            .then(dbUser => {console.log(dbUser), res.json(dbUser)})
                            .catch(err => res.status(422).json(err)))
          .catch(err => res.status(422).json(err));
    }
};
