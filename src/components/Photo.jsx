import React from 'react'
import { useAppContext } from '../context/context';

const Photo = ({ id, secret, server, title }) => {
    const { openPhotoPreview, setPreviewPhoto } = useAppContext();
    const url = `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
    const preview_url = `https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`;

    const handleClick = () => {
        openPhotoPreview();
        setPreviewPhoto(preview_url);
    }
    return (
        <>
            <div onClick={handleClick} className=''>
                <img src={url} alt={title} className='h-[200px] sm:h-[300px] md:h-[400px] w-[100%]' />
            </div>

        </>
    )
}

export default Photo
