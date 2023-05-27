import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/context';
import Loading from './Loading';
import Photo from './Photo';
import NoResults from './NoResults';

const PhotoContainer = () => {
    const { photos, search_results, loading, error, getRecentPhotos, searchPhotos, search_text } = useAppContext();
    const [page, setPage] = useState(1);

    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
    });

    useEffect(() => {
        if (search_text !== '') {
            searchPhotos(search_text, page);
        }
        else {
            getRecentPhotos(page);
        }
    }, [page]);

    if (error) {
        return <Error />
    }
    else {
        return (
            <div className='mt-[7rem]'>
                {
                    search_text.length > 0 ?
                        <>
                            {
                                search_results.length > 0 &&
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-center'>
                                    {
                                        search_results.map((photo, index) => {
                                            const { id, server, secret, title } = photo;
                                            return <Photo key={`${id}&${index}`}
                                                id={id}
                                                server={server}
                                                secret={secret}
                                                title={title} />
                                        })
                                    }
                                </div>

                            }
                        </> :
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-center'>
                            {
                                photos.map((photo, index) => {
                                    const { id, server, secret, title } = photo;
                                    return <Photo key={`${id}&${index}`}
                                        id={id}
                                        server={server}
                                        secret={secret}
                                        title={title} />
                                })
                            }
                        </div>
                }
                {
                    loading ? <Loading /> : <>{!search_results.length > 0 && <NoResults />}</>
                }
            </div>
        )
    }

}

export default PhotoContainer;
