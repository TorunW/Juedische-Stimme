import React, {useState} from 'react'
const SearchFilter = ({categoryName, categories}) => {
    const [ searchPhrase, setSearchPhrase ] = useState('')
    function onCategorySelectChange(val){
        window.location.href = `/category/${val}`
    }
    let categoryOptionsDisplay;
    if (categories){
        categoryOptionsDisplay = (
            categories.map((cat,index)=>(
                <option key={index} value={cat.name} selected={cat.name === categoryName ? true : false}>{cat.name}</option>
            ))
        )
    }
    return (
    <div style={{backgroundColor:"yellow"}}>
        <h2>FIlter</h2>
        <select value={categoryName} onChange={e => onCategorySelectChange(e.target.value)}>
            <option value={'Select'}>Select Category</option>
            {categoryOptionsDisplay}
        </select>
        <input type={"text"} placeholder="search" value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)} />
        <button onClick={() => window.location.href = `/search/${searchPhrase}`}>search</button>
    </div>
    )
}
export default SearchFilter