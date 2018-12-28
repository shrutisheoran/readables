import * as StoryAPI from '../utils/StoryAPI';
import require from 'uuid';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function editPost({ id, title, body }) {
    return {
        type: EDIT_POST,
        id,
        title,
        body,
    }
}

export function editComment({id, timestamp, body}) {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body,
    }
}

export function addPost({id, timestamp, title, body, author, category}) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function addComment({ id, timestamp, parentId, author, body }) {
    return {
        type: ADD_COMMENT,
        id,
        timestamp,
        body,
        author,
        parentId
    }
}

export function votePost({id, option}) {
    return {
        type: VOTE_POST,
        id,
        option,
    }
}

export function voteComment({id, option}) {
    return {
        type: VOTE_COMMENT,
        id,
        option,
    }
}

export function deletePost(id) {
    return {
        type: DELETE_POST,
        id,
    }
}

export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id,
    }
}

export function getAllCategories(content) {
    return {
        type: GET_ALL_CATEGORIES,
        content,
    }
}

export function getAllPosts(content) {
    return {
        type: GET_ALL_POSTS,
        content,
    }

}

export function getAllComments(content) {
    return {
        type: GET_ALL_COMMENTS,
        content,
    }
}

export const addPostAPI = ({ title, body, author, category }) => (dispatch) => {
    let id = require('uuid/v4');
    let timestamp = Date.now();
    return StoryAPI.addPost({ id, timestamp, title, body, author, category }).then((data) => {
        dispatch(addPost({id, timestamp, title, body, author, category}));
    }).then(() => Promise.resolve);
}

export const addCommentAPI = ({ parentId, author, body }) => (dispatch) => {
    let id = require('uuid/v4');
    let timestamp = Date.now();
    return StoryAPI.addComment({id, timestamp, parentId, author, body}).then((data) => {
        dispatch(addComment(data));
    }).then(() => Promise.resolve);
}

export const editPostAPI = ({id, title, body}) => (dispatch) => {
    return StoryAPI.editPost(id, {title, body}).then((data) => {
        dispatch(editPost(data));
    }).then(() => Promise.resolve);
}

export const editCommentAPI = ({id, body}) => (dispatch) => {
    let timestamp = Date.now();
    return StoryAPI.editComment(id, {timestamp, body}).then((data) => {
        dispatch(editComment(data));
    }).then(() => Promise.resolve);
}

export const votePostAPI = ({id, option}) => (dispatch) => {
    return StoryAPI.votePost(id, option).then((data) => {
        dispatch(votePost({id, option}));
    }).then(() => Promise.resolve);
}

export const voteCommentAPI = ({id, option}) => (dispatch) => {
    return StoryAPI.voteComment(id, option).then((data) => {
        dispatch(voteComment({id, option}));
    }).then(() => Promise.resolve);
}

export const deletePostAPI = ({id}) => (dispatch) => {
    return StoryAPI.deletePost(id).then((data) => {
        dispatch(deletePost(id));
    }).then(() => Promise.resolve);
}

export const deleteCommentAPI = ({id}) => (dispatch) => {
    return StoryAPI.deleteComment(id).then((data) => {
        dispatch(deleteComment(id));
    }).then(() => Promise.resolve);
}

export const fetchAllCategories = () => (dispatch) => {
    return StoryAPI.getAllCategories().then((data) => {
        dispatch(getAllCategories(data));
    }).then(() => Promise.resolve);
}

export const fetchAllPosts = () => (dispatch) => {
    return StoryAPI.getAllPosts().then((data) => (
        dispatch(getAllPosts(data))
    )).then(() => Promise.resolve);
}

export const fetchAllComments = (postId) => (dispatch) => {
    return StoryAPI.getAllComments(postId).then((data) => (
        dispatch(getAllComments(data))
    )).then(() => Promise.resolve);
}

export const fetchInitialState = () => (dispatch) => {
    return dispatch(fetchAllCategories()).then(() => dispatch(fetchAllPosts()));
}