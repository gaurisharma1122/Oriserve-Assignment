import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/context';


const Searchbar = () => {
    const { search_suggestions, saveSearchSuggestions, clearSearchSuggestions, searchPhotos, setSearchText } = useAppContext();
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleClick = () => {
        if (searchQuery.length > 1) {
            saveSearchSuggestions(searchQuery);
        }
        //setSearchQuery('');
        setShowSearchSuggestions(false);
        searchPhotos(searchQuery, 1);
    };

    const handleClear = () => {
        clearSearchSuggestions();
        setShowSearchSuggestions(false);
    };

    useEffect(()=>{
        if(searchQuery!==''){
            setSearchText(searchQuery);
            searchPhotos(searchQuery, 1);
        }
    }, [searchQuery]);

    return (
        <div className='h-[7rem] bg-black_bg text-white flex flex-col items-center justify-center fixed w-full top-0'>
            <div className='relative'>
                <h1 className='text-xl sm:text-3xl font-semibold mb-3 text-center'>Search Photos</h1>
                <form onSubmit={(e) => e.preventDefault()} className='flex'>
                    <input type="text" placeholder='Search for photos...'
                        className='text-base sm:text-xl py-1 sm:py-2 px-4 w-[200px] sm:w-[300px] rounded-l-md text-black'
                        onClick={() => setShowSearchSuggestions(true)}
                        value={searchQuery}
                        onChange={(e)=>{
                            setSearchQuery((e.target.value).trim());
                            setShowSearchSuggestions(true);
                            }} />
                    <button className='text-base sm:text-xl bg-black_bg text-white cursor-pointer px-4 rounded-r-md border-2 border-white'
                        onClick={handleClick}>
                        Search
                    </button>
                </form>

                {search_suggestions.length >= 1 &&
                    <div className={`absolute w-full flex items-center top-100 ${!showSearchSuggestions && 'hidden'}`}>
                        <div className='bg-white mt-2 rounded-md text-black_bg  w-full overflow-hidden '>
                            <ul>
                                {
                                    search_suggestions.length >= 1 ?
                                        search_suggestions.map((item, index) => {
                                            return <li key={index} onClick={() => setSearchQuery(item)}
                                                className='py-2 px-4 cursor-pointer hover:bg-slate-200'>
                                                {item}
                                            </li>
                                        }) :
                                        <li className='py-2 px-4'>Your search suggestions appear here</li>
                                }
                            </ul>
                            <div className='flex items-center justify-center gap-[20px] pt-4 pb-1'>
                                <button className='py-[5px] px-[10px] cursor-pointer bg-red rounded-md hover:bg-red_hover text-white'
                                    onClick={handleClear}>
                                    Clear
                                </button>
                                <button className='py-[5px] px-[10px] cursor-pointer bg-red rounded-md hover:bg-red_hover text-white'
                                    onClick={() => { setShowSearchSuggestions(false) }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Searchbar
