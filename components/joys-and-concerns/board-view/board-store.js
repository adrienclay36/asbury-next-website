import React, {createContext, useState, useEffect} from 'react'


const BoardContext = createContext({
    posts: [],
    fetchPosts: () => {},
    increasePage: () => {},
    decreasePage: () => {},
    pageNumber: 0,
    loading: false,

})

const BoardStoreProvider = () => {
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);




    const contextValue = {
        posts: [],
        loading: loading,
        pageNumber: pageNumber,
    }
  return (
    <BoardContext.Provider value={contextValue}>

    </BoardContext.Provider>
  )
}

export default BoardStoreProvider