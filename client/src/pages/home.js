import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/userContext";
import SearchForm from '../components/SearchForm/SearchForm';
import API from "../utils/API";
import { ResultCard, ChildListItem } from "../components/ResultCard/ResultCard";
import Grid from '@material-ui/core/Grid';
import "./style/home.css";

let resultsAll = [];

function Home() {
    const { userState } = useContext(UserContext);
    const { user } = userState;

    const [child, setChild] = useState([])
    const [childSearch, setChildSearch] = useState("");
    const [date, setDate] = useState("");

    // Load any upcoming events
    useEffect(() => {
        API.searchChildren(user.uid)
            .then(res => {
                console.log(res.data)
                resultsAll = res.data;
                setChild(resultsAll)
            })
            .catch(err => console.log(err));
        loadEvents()
    }, [])

    function loadEvents() {
        API.getEvents()
            .then(console.log("Upcoming Events"))
            .catch(err => console.log(err));
    };

    //Search for child
    function handleInputChange(event) {
        const { value } = event.target;
        let searchInput = "";
        if (value.length > 0 && value !== " ") {
            searchInput = value;
        } else {
            searchInput = value.trim();
        }
        setChildSearch(searchInput);
    };

    function handleSearchChild(event) {
        event.preventDefault();

        let searchTerm = childSearch.toLowerCase();
        let filterResults = [];
        if (childSearch !== "") {
            filterResults = resultsAll.filter(child =>
                child.firstName.toLowerCase().includes(searchTerm) ||
                child.lastName.toLowerCase().includes(searchTerm) ||
                child.activities.toLowerCase().includes(searchTerm) ||
                child.parent.address.city.toLowerCase().includes(searchTerm) ||
                child.parent.address.state.toLowerCase().includes(searchTerm) ||
                child.parent.address.zip.toLowerCase().includes(searchTerm)
            )
        } else {
            filterResults = resultsAll
        }
        setChild(filterResults)
    };



    return (
        <div>
            <h2>Welcome {user.displayName}</h2>
            <Grid container justify="center">
                <SearchForm
                    handleInputChange={handleInputChange}
                    handleSearchChild={handleSearchChild}
                />
                <Grid container justify="center" >
                    {!child.length ? (
                        <h2>No results found</h2>
                    ) : (
                            <ResultCard>
                                {child.map(child => {
                                    return (
                                        <ChildListItem
                                            key={child._id}
                                            child={child}
                                        />
                                    );
                                })}
                            </ResultCard>
                        )}

                </Grid>
            </Grid>
        </div>
    )
}

export default Home;