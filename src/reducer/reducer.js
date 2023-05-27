import { CLEAR_SEARCH_SUGGESTIONS, CLOSE_PHOTO_PREVIEW, GET_PHOTOS_BEGIN, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS, OPEN_PHOTO_PREVIEW, SAVE_SEARCH_SUGGESTIONS, SEARCH_PHOTOS_BEGIN, SEARCH_PHOTOS_ERROR, SEARCH_PHOTOS_SUCCESS, SET_PREVIEW_PHOTO, SET_SEARCH_RESULTS, SET_SEARCH_TEXT } from "../actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case GET_PHOTOS_BEGIN:
            {
                return { ...state, loading: true, error: false };
            }; break;
        case GET_PHOTOS_SUCCESS:
            {
                return { ...state, loading: false, error: false, photos: [...state.photos, ...action.payload] }
            }; break;
        case GET_PHOTOS_ERROR:
            {
                return { ...state, loading: false, error: true };
            }; break;
        case SAVE_SEARCH_SUGGESTIONS:
            {
                return { ...state, search_suggestions: [...state.search_suggestions, action.payload] };
            }; break;
        case CLEAR_SEARCH_SUGGESTIONS:
            {
                return { ...state, search_suggestions: [] };
            }; break;
        case SEARCH_PHOTOS_BEGIN:
            {
                return { ...state, loading: true, error: false };
            }; break;
        case SEARCH_PHOTOS_SUCCESS:
            {
                return { ...state, loading: false, error: false, search_results: [...state.search_results, ...action.payload] };
            }; break;
        case SEARCH_PHOTOS_ERROR:
            {
                return { ...state, loading: false, error: true };
            }; break;
        case SET_SEARCH_TEXT:
            {
                return { ...state, search_text: action.payload, search_results: [] };
            }; break;
        case SET_SEARCH_RESULTS:
            {
                return { ...state, search_results: [...state.photos] };
            }; break;
        case OPEN_PHOTO_PREVIEW:
            {
                return { ...state, show_photo_preview: true };
            }; break;
        case CLOSE_PHOTO_PREVIEW:
            {
                return { ...state, show_photo_preview: false };
            }; break;
        case SET_PREVIEW_PHOTO:
            {
                return { ...state, preview_photo: action.payload };
            }; break;

    }
};