import fetch from 'cross-fetch';

const headers = {'Authorization': 'ajbduhaw133bvjdoi4968'};
const url = 'http://localhost:3001';


export const getAllCategories = () =>
    fetch(`${url}/categories`,{ headers })
    .then((response)=> response.json())
    .then((data) => (data.categories));

export const getCategory = (category) =>
    fetch(`${url}/${category}/posts`, { headers })
    .then((response)=> response.json())
    .then((data)=>console.log(data));

export const getAllPosts = () =>
    fetch(`${url}/posts`, { headers })
    .then((response)=> response.json())

export const addPost = (post) =>
    fetch(`${url}/posts`, {
        method: `POST`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post),
    })

export const getPost = (id) =>
    fetch(`${url}/posts/${id}`, { headers })
    .then((response) => response.json())
    .then((data) => console.log(data));

export const votePost = (id, option) =>
    fetch(`${url}/posts/${id}`,  {
        method: `POST`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option }),
    })
    .then((response) => response.json())

export const editPost = (id, post) => {
    return fetch(`${url}/posts/${id}`, {
        method: 'PUT',
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post),
    })
    .then((response) => response.json())
}

export const deletePost = (id) =>
    fetch(`${url}/posts/${id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
    .then((response) => response.json())

export const getAllComments = (id) =>
    fetch(`${url}/posts/${id}/comments`, { headers })
    .then((response) => response.json())

export const addComment = (comment) =>
    fetch(`${url}/comments`, {
        method: `POST`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment),
    })
    .then((response) => response.json())

export const getComment = (id) =>
    fetch(`${url}/comments/${id}`, { headers })
    .then((response) => response.json())

export const voteComment = (id, option) =>
    fetch(`${url}/comments/${id}`, {
        method: `POST`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option }),
    })
    .then((response) => response.json())

export const editComment = (id, comment) =>
    fetch(`${url}/comments/${id}`, {
        method: `PUT`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })
    .then((response) => response.json())

export const deleteComment = (id) => {
    return fetch(`${url}/comments/${id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
    .then((response) => response.json())
}