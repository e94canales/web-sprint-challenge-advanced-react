import React from 'react'

const Search = props => {

    return (
        <form onSubmit={props.searchSubmit} className='searchForm'>
            <input name='search' type='text' onChange={props.searchHandler} value={props.searchTerm}>
            </input>
        </form>
    )
}

export default Search