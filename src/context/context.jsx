import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "../reducer/reducer";
import { BASE_URL, api_key } from "../constants";
import { CLEAR_SEARCH_SUGGESTIONS, SAVE_SEARCH_SUGGESTIONS, SEARCH_PHOTOS_BEGIN, SEARCH_PHOTOS_ERROR, SEARCH_PHOTOS_SUCCESS, SET_SEARCH_TEXT, GET_PHOTOS_BEGIN, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS, OPEN_PHOTO_PREVIEW, CLOSE_PHOTO_PREVIEW, SET_PREVIEW_PHOTO } from "../actions";

const AppContext = createContext();

const initialState = {
    photos: [],
    loading: true,
    error: false,
    search_text: '',
    search_results: [],
    search_suggestions: [],
    show_photo_preview: false,
    preview_photo: '',
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const saveSearchSuggestions = (searchQuery) => {
        dispatch({ type: SAVE_SEARCH_SUGGESTIONS, payload: searchQuery });
    };
    const clearSearchSuggestions = () => {
        dispatch({ type: CLEAR_SEARCH_SUGGESTIONS });
    };
    const getRecentPhotos = (page) => {
        dispatch({ type: GET_PHOTOS_BEGIN });
        fetch(`${BASE_URL}?format=json&format=json&method=flickr.photos.getRecent&api_key=${api_key}&nojsoncallback=1&page=${page}&per_page=10`)
            .then(response => response.json())
            .then(respData => {
                dispatch({ type: GET_PHOTOS_SUCCESS, payload: respData.photos.photo });
            })
            .catch(error => {
                console.log('recent photos: ', error)
                dispatch({ type: GET_PHOTOS_ERROR });
            })
    }; 
    const searchPhotos = (searchQuery, page) => {
        if(searchQuery.trim().length===0){
            
        }
        dispatch({ type: SEARCH_PHOTOS_BEGIN });
        fetch(`${BASE_URL}?format=json&format=json&method=flickr.photos.search&api_key=${api_key}&nojsoncallback=1&page=${page}&per_page=10&text=${searchQuery}`)
            .then(response => response.json())
            .then(respData => {
                dispatch({ type: SEARCH_PHOTOS_SUCCESS, payload: respData.photos.photo });
            })
            .catch(error => {
                dispatch({ type: SEARCH_PHOTOS_ERROR });
            })
    };
    const setSearchText= (text)=>{
        dispatch({ type: SET_SEARCH_TEXT, payload: text });
    };
    const openPhotoPreview= ()=>{
        dispatch({ type: OPEN_PHOTO_PREVIEW });
    };
    const closePhotoPreview= ()=>{
        dispatch({ type: CLOSE_PHOTO_PREVIEW });
    }
    const setPreviewPhoto= (url)=>{
        dispatch({ type: SET_PREVIEW_PHOTO, payload: url });
    }

    useEffect(()=>{
        getRecentPhotos(1);
    }, []);

    return (
        <AppContext.Provider value={{ ...state, saveSearchSuggestions, clearSearchSuggestions, getRecentPhotos, searchPhotos, setSearchText, openPhotoPreview, closePhotoPreview, setPreviewPhoto  }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;

export const useAppContext = () => {
    return useContext(AppContext);
};