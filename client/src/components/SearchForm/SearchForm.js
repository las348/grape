import React from 'react';
import './style.css';

function SearchForm(props) {

    return (
        <div className="homeSearch">
            <div>
                <div>
                    <input name='search'
                        placeholder='Search'
                        type='text'
                        onChange={props.handleInputChange}></input>
                    <br />
                    <button
                        className='btn btn-link'
                        id='search'
                        onClick={props.handleSearchChild}
                        type='submit'
                    >   
                    <i className="fa fa-search"></i>
                    Search
            </button>
                </div>
            </div>
        </div>
    )
}

export default SearchForm;