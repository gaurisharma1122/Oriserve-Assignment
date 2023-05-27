import React from 'react'
import { useAppContext } from '../context/context'
import { AiFillCloseCircle } from 'react-icons/ai'

const PhotoPreview = () => {
    const { show_photo_preview, closePhotoPreview, preview_photo } = useAppContext();

    return (
        <div className={`fixed top-0  w-full h-full bg-black flex items-center justify-center z-10  ${!show_photo_preview && 'hidden'}`}>
            <AiFillCloseCircle className='text-white absolute top-2 text-2xl cursor-pointer right-2 z-20' onClick={closePhotoPreview} />
            <img src={preview_photo} alt="img_prev" />
        </div>
    )
}

export default PhotoPreview
