import React, { useContext } from "react";
import UserContext from "../../utils/userContext";
import "./childList.css";
import { ResultCard, ChildCard } from '../ChildCard/index';

function ChildList(props) {
    const { updateChild, deleteChild, uploadImage } = props;
    const { userState } = useContext(UserContext);
    const { user } = userState;

    return (
        <div>
        {!user.children.length ? (
             <h2>No children listed</h2>
             ) : (
           
            <ResultCard >
                {user.children.map(child => {
                    return (
                        <ChildCard
                            key={child._id}
                            child={child}
                            updateChild={updateChild}
                            deleteChild={deleteChild}
                            uploadImage={uploadImage}
                        />
                    );
                })
                }
            </ResultCard>
             )}
        </div>
    );
}

export default ChildList;