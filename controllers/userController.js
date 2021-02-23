const db = require("../models");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining methods for the userController
module.exports = {
    // Find user/Parent for input firebase uid and return parent and child info for Profile page
    findOne: function(req, res) {
        db.User
        .find({uid: req.params.userId})
        .populate("children")
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    // Return list of children to be displayed on search result.
    searchChildren: function(req, res) {
        db.User
        .findOne({uid: req.params.userId })
        .then((_id) => db.Child
                        .find({parent : {$ne :_id}})
                        .populate("parent", "uid address")
                        .then(dbUser => res.json(dbUser))
                        .catch(err => res.status(422).json(err))
            )
        .catch(err => res.status(422).json(err));
    },
    // Create a new user/Parent document
    create: function(req, res) {
        db.User
        .create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    // Update input user/Parent's information and return updated document 
    updateUser: function(req, res) {
        console.log(req.params.userId);
        console.log(req.body);
        db.User
          .findOneAndUpdate({uid: req.params.userId}, {displayName: req.body.displayName, address: req.body.address }, { new: true })
          .populate("children")
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(422).json(err));
    },
    // Add a child to input user/Parent's document. Please note user document is found using firebase uid 
    addChild: function(req, res) {
        console.log(`Add Child`, req.body);
        db.Child
          .create(req.body)
          .then(({_id}) => db.User
                            .findOneAndUpdate({uid: req.params.userId}, { $push: { children: _id } }, { new: true }) 
                            .populate("children")
                            .then(dbUser => res.json(dbUser))
                            .catch(err => res.status(422).json(err)))
          .catch(err => res.status(422).json(err));
    },
    // Remove a child from input user/Parent's document. Please note user document is found using firebase uid and child document 
    // is found using mongoDB _id. 
    removeChild: function(req, res) {
        console.log(`Remove Child`, req.body);
        let childToRemove = req.body.childID;
        db.Child
        .deleteOne({ _id: childToRemove })
        .then(() => db.User
                    .findOneAndUpdate({uid: req.params.userId}, { $pull: { children: {_id: childToRemove} } }, { new: true })
                    .populate("children")
                    .then(dbUser => res.json(dbUser))
                    .catch(err => res.status(422).json(err)))
        .catch(err => res.status(422).json(err));
    },
    // Update input child's document. Please note child document is found using mongoDB _id
    updateChild: function(req, res) {
        db.Child
        .findOneAndUpdate({ _id: req.body._id }, {firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, activities: req.body.activities}, { new: true })
        .then(() => db.User
                    .findOne({uid: req.params.userId})
                    .populate("children")
                    .then(dbUser => res.json(dbUser))
                    .catch(err => res.status(422).json(err)))
        .catch(err => res.status(422).json(err));
    },
    updateImage: function(req, res) {
        let {imageURL, imageFor} = req.body
        console.log(`Updating image for:`, imageFor)
        if (imageFor === "child") {
            db.Child
            .findOneAndUpdate({ _id: req.params.ID }, {image: imageURL}, { new: true })
            .then(dbChild => res.json(dbChild))
            .catch(err => res.status(422).json(err));
        } else if (imageFor === "user") {
            db.User
            .findOneAndUpdate({uid: req.params.ID}, {image: imageURL}, { new: true })
            .populate("children")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
        }
    },
    // Get all events for the input user/Parent
    findEvents: function(req, res) {
        let userID = req.params.userId;
        console.log(`User events input:`, userID )
        db.User
        .find({_id: userID})
        .then(resp => res.json(resp[0].playdate))
        .catch(err => res.status(422).json(err));
    }
};
