import React from 'react'

const Loading = () => {
    return (
        <>
            {/*<div className='min-h-[60vh] flex items-center justify-center'>
      <h1 className='text-4xl font-bold text-center text-black'>Loading ...</h1>
  </div>*/}
            < div className="flex justify-center items-center h-screen" >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div >
        </>
    )
}

export default Loading
