import React from 'react';
import { useState, useEffect } from 'react';
import { getAllBlogPosts, deleteBlogPost, updateBlogPost, createBlogPost } from '../../../firebase-util';


export const BlogContext = React.createContext({
  posts: [],
  deletePost: (id) => {},
  createPost: (title, author, image, content) => {},
  updatePost: (id, title, author, image, content) => {},
  modifying: false,
});


const BlogContextProvider = (props) => {
    const [modifying, setModifying] = useState(false);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const { posts, totalPages } = getAllBlogPosts();
        setPosts(posts);
    }

    const deletePost = async (id) => {
        await deleteBlogPost(id);
        toggleModifying();
    }
    
    const updatePost = async(id, title, author, image, content) => {
        console.log(title, author, image, content);
        await updateBlogPost(id, title, author, image, content);
        toggleModifying();
    }

    const createPost = async (title, author, image, content) => {
        await createBlogPost(title, author, image, content);
    }


    useEffect(() => {
        getPosts();
    }, [modifying])

    const contextValue = {
        posts: posts,
        deletePost: deletePost,
        updatePost: updatePost,
        createPost: createPost,
        modifying: modifying,
        
    }


    const toggleModifying = () => {
        setModifying(!modifying);
    }




    return (
        <BlogContext.Provider value={contextValue}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;