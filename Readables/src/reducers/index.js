import { GET_ALL_CATEGORIES, GET_ALL_POSTS, GET_ALL_COMMENTS, EDIT_POST, EDIT_COMMENT} from '../actions';
import { ADD_COMMENT, ADD_POST, VOTE_POST, VOTE_COMMENT, DELETE_COMMENT, DELETE_POST} from '../actions';
import { combineReducers } from 'redux';
import { store } from '..';

const initialState = store ? store.getState(): {};

function allCategories (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_CATEGORIES:
            const { content } = action;
            const newState = content.reduce((temp, obj) => {
                temp[obj.name] = {name: obj.name, posts: []};
                return temp;
            }, {});
            return {...state, ...newState};
        default:
            return state;
    }
}

function allPosts (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            const { content } = action;
            const newState = content.reduce((temp, obj) => {
                temp[obj.id] = obj;
                return temp;
            }, {});
            return  {...state, ...newState};
        case EDIT_POST:
            const {id, title, body} = action;
            const obj = state[id];
            obj.title = title;
            obj.body = body;
            return {...state, [id]: obj};
        case ADD_POST:
            const newPost = {
                id: action.id,
                timestamp: action.timestamp,
                title: action.title,
                body: action.body,
                author: action.author,
                category: action.category,
                commentCount: 0,
                voteScore: 0,
                deleted: false
            }
            return {...state, [action.id]: newPost};
        case VOTE_POST:
            const post = state[action.id];
            action.option==='upVote' ? post.voteScore++: post.voteScore--;
            return {...state, [action.id]: post};
        case DELETE_POST:
            const deletePost = state[action.id];
            deletePost.deleted = true;
            return {...state, [action.id]: deletePost};
        default:
            return state;
    }
}
function allComments (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_COMMENTS:
            const { content } = action;
            if(content.length!==0){
                const comments = content.reduce((obj, comment) => {
                    obj[comment.id] = comment;
                    return obj;
                },{});
                return {...state, ...comments};
            }
            else
                return state;

        case EDIT_COMMENT:
            const {id, timestamp, body} = action;
            const obj = state[id];
            obj.timestamp = timestamp;
            obj.body = body;
            return {...state, [id]: obj};
        case ADD_COMMENT:
            const newComment = {
                id: action.id,
                timestamp: action.timestamp,
                body: action.body,
                author: action.author,
                parentId: action.parentId,
                voteScore: 0,
                deleted: false,
            };
            return {...state, [action.id]: newComment};
        case VOTE_COMMENT:
            const comment = state[action.id];
            action.option==='upVote' ? comment.voteScore++: comment.voteScore--;
            return {...state, [action.id]: comment};
        case DELETE_COMMENT:
            const deleteComment = state[action.id];
            deleteComment.deleted =  true;
            return {...state, [action.id]: deleteComment};
        default:
            return state;
    }
}
export default combineReducers({
    allCategories,
    allPosts,
    allComments,
})