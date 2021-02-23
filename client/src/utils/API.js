import axios from "axios";

export default {
    // Get logged in User's info from database
    getSavedUser: async function (uid) {
        return await axios.get("/api/users/" + uid);
    },
    // Get list of children to show on search results
    searchChildren: async function (uid) {
        return await axios.get("/api/users/" + uid + "/search/");
    },
    // Save a User to the database -- DO NOT ADD async await to this function. 
    createNewUser: function (user) {
        return axios.post("/api/users/", user);
    },
    // Update a user to the database
    updateUser: async function (updateUser, uid) {
        return await axios.put("/api/users/" + uid, updateUser);
    },
    addChild: async function (childObj, uid) {
        return await axios.post("/api/users/" + uid + "/child/", childObj);
    },
    removeChild: async function (childID, uid) {
        let body = {
            childID
        }
        return await axios.delete(`/api/users/${uid}/child/`, { data: body });
    },
    // Update child data
    updateChild: async function (childObj, uid) {
        return await axios.put("/api/users/" + uid + "/child/", childObj)
    },
    // Upload image to S3 bucket 
    // This route returns the URL where the file will be actually uploaded and also returns the URL to the image file
    signIntoS3: async function (imageInfo) {
        return await axios.post("/api/image/", imageInfo);
    },
    uploadImageS3: async function (URL, imageFile, options) {
        return await axios.put(URL, imageFile, options);
    },
    updateImage: async function (ID, imageURL, imageFor) {
        let body = {
            imageURL,
            imageFor
        }
        console.log(`API body:`, body);
        return await axios.put("/api/users/image/" + ID, body);
    },
    setPlaydate: async function (playdate) {
        return await axios.post("/api/events/", playdate);
    },
    findEvents : async function(user) {
        return await axios.get("/api/users/events/" + user);
    },
    getEventInfo : async function(playdate) {
        return await axios.get("/api/events/" + playdate);
    }
}


