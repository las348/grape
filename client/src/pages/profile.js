import React, { useContext } from "react";
import API from "../utils/API";
import ProfileCard from "../components/ProfileCard/profilecard";
import ChildList from "../components/ChildList"
import UserContext from "../utils/userContext";
import "./style/profile.css";

function Profile() {
  const { userState, setUserState } = useContext(UserContext);
  const { user } = userState;
  console.log(`User Context`, user);


  function updateUser(userInfo) {
    console.log(`Updating User Info: `, userInfo);

    API.updateUser(userInfo, user.uid)
      .then((res) => {
        console.log(`User Info Updated: `, res);
        setUserState({ ...userState, user: res.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  //Child functions
  function addChild(childInfo) {
    console.log(`Adding child:`, childInfo);
    let childInfoAdd = {
      firstName: childInfo.firstName,
      lastName: childInfo.lastName,
      age: childInfo.age,
      activities: childInfo.activities,
      parent: user._id
    }

    API.addChild(childInfoAdd, user.uid)
      .then((res) => {
        console.log(`Child Added successfully: `, res.data);
        setUserState({ ...userState, user: res.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  function updateChild(childInfo) {
    console.log(`Updating child:`, childInfo);
    API.updateChild(childInfo, user.uid)
      .then((res) => {
        console.log(`Child Updated successfully: `, res.data);
        setUserState({ ...userState, user: res.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteChild(childId) {
    console.log(`Removing child:`, childId);
    API.removeChild(childId, user.uid)
      .then((res) => {
        console.log(`Child Deleted successfully: `, res.data);
        setUserState({ ...userState, user: res.data })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  // Upload Image
  async function uploadImage(imageFile, ID, imageFor) {
    try {
      console.log(`uploadImage: `, imageFor)
      let fileParts = imageFile.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      
      const response = await API.signIntoS3({
        fileName: fileName,
        fileType: fileType
      })

      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };

      // const result = await API.uploadImageS3(signedRequest, imageFile, options)
      console.log(`updateImage: `, imageFor)
      const res = await API.updateImage(ID, url, imageFor)
      console.log(`Response from backend for updateImage: `, res.data);

      return { success: true, url: url, user: res.data }
    } catch (e) {
      console.log(e)
      return { success:false, url: null}
    }
  }

  return (
    <div className="backImg">
      <div className="profileContainer">
      <h2>{user.displayName}'s Profile</h2>
        
        <ProfileCard
          updateUser={updateUser}
          addChild={addChild}
          uploadImage={uploadImage}
        />
        {user.children ?
          <ChildList
            updateChild={updateChild}
            deleteChild={deleteChild}
            uploadImage={uploadImage}
          />
          :
          <div></div>
        }
      </div>
    </div>
  )
}

export default Profile;