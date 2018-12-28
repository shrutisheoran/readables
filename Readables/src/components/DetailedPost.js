import React, { Component } from 'react';
import { fetchAllComments, editPostAPI, addCommentAPI, votePostAPI, deletePostAPI } from '../actions';
import { Feed, Icon, Comment, Loader, Form, Header, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CustomComment from './CustomComment';
import serializeForm from 'form-serialize';

class DetailedPost extends Component {
    hidden = 'true';
    myRef = React.createRef();
    state = { modalEditOpen: false , modalDeleteOpen: false};
    handleEditOpen = () => this.setState({ modalEditOpen: true , modalDeleteOpen: false});
    handleEditClose = () => this.setState({ modalEditOpen: false, modalDeleteOpen: false });
    handleDeleteOpen = () => this.setState({ modalEditOpen: false , modalDeleteOpen: true});
    handleDeleteClose = () => this.setState({ modalEditOpen: false, modalDeleteOpen: false });
    upVote = (e) => {
        e.target.style.color = 'blue';
        this.props.votePost({id: this.props.content.id, option: 'upVote'});
    }
    downVote = (e) => {
        e.target.style.color = 'red';
        this.props.votePost({id: this.props.content.id, option: 'downVote'});
    }
    componentWillMount() {
        this.props.getComments(this.props.content.id);
    }
    componentDidMount() {
        this.myRef.current.style.display = 'none';
    }
    handlePostEdit = (e) => {
        this.handleEditClose();
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true} );
        this.props.editPost({id: this.props.content.id, title: values.title, body: values.body});
    }
    handleCommentAdd = (e) => {
        const values = serializeForm(e.target, {hash: true} );
        this.props.addComment({ parentId: this.props.content.id, author: values.author, body: values.body });
    }
    loadComments = () => {
        if(this.hidden==='true') {
            this.myRef.current.style.display = 'block';
            this.hidden= 'false';
        }
        else {
            this.myRef.current.style.display = 'none';
            this.hidden ='true';
        }
    }
    handlePostDelete = (e) => {
        this.handleDeleteClose();
        e.preventDefault();
        this.props.deletePost({id: this.props.content.id});
    }
    navigate() {
        this.props.history.push('/' + `${this.props.category}`);
    }
    render() {
        const { content, comments } = this.props;
        const { author, voteScore, timestamp, title, body } = content;
        if(this.props.content.deleted == true)
            this.navigate();
        return(
            <div style={{fontFamily: 'cursive'}}>
                <Feed>
                    <Feed.Event>
                    <Feed.Label>
                        <Icon name='user'/>
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                        <span style={{display: 'flex', fontSize: '20px'}}>
                        <Feed.User>{author}</Feed.User> posted it
                        <span style={{margin: '8px 8px 8px 8px', marginRight: '15px'}}><Feed.Date>{timestamp}</Feed.Date></span>
                        <Modal
                            trigger={<Button style={{padding:'5px', marginRight: '10px'}} onClick={this.handleEditOpen} basic color='teal'>Edit</Button>}
                            open={this.state.modalEditOpen}
                            onClose={this.handleEditClose}
                            basic
                            size='small'
                        >
                            <Header icon='edit' content='Edit Your Post'/>
                            <Modal.Actions>
                            <Form onSubmit={this.handlePostEdit}>
                                <Form.Field>
                                <label style={{color: 'white'}}>Title</label>
                                <input name='title' placeholder='Title' />
                                </Form.Field>
                                <Form.Field>
                                <label style={{color: 'white'}}>Body</label>
                                <input name='body' placeholder='Body' />
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                            </Form>
                            </Modal.Actions>
                        </Modal>
                        <Modal
                            trigger={<Button style={{padding:'5px', marginRight: '10px'}} onClick={this.handleDeleteOpen} basic color='grey'>Delete</Button>}
                            open={this.state.modalDeleteOpen}
                            onClose={this.handleDeleteClose}
                            basic
                            size='small'
                        >
                            <Header icon='delete' content='Delete Your Post'/>
                            <Modal.Actions>
                                <h2 style={{color: 'white'}}>Are you sure you want to delete it?</h2>
                                <Button onClick={this.handlePostDelete}>Delete</Button>
                            </Modal.Actions>
                        </Modal>
                        </span>
                        <h3>{title}</h3>
                        <p>{body}</p>
                        </Feed.Summary>
                        <Feed.Meta>
                        <span style={{display: 'flex',}}>
                            <span style={{fontSize: '1.5em'}}>
                                <Icon name='thumbs up outline' style={{cursor: 'pointer'}} onClick={this.upVote}/>&ensp;
                                <Icon name='thumbs down outline' style={{cursor: 'pointer'}} onClick={this.downVote}/>&ensp;
                                {voteScore}
                            </span>
                            <span style={{ fontSize: '1.2em', marginTop: '0px', marginLeft: '20px'}}>
                            <Button basic color='orange' onClick={this.loadComments} style={{padding: '6px'}}>Comments&ensp;{content.commentCount}</Button>
                            </span>
                        </span>
                        </Feed.Meta>
                    </Feed.Content>
                    </Feed.Event>
                </Feed>
                <div id='comment-block' ref={this.myRef}>
                    <Comment.Group>
                        <Header as='h3' dividing>
                        Comments
                        </Header>
                        {comments.length!==undefined?
                            comments
                            .filter((comment) => comment.parentId===content.id&&comment.deleted==false)
                            .map((comment) => (
                                <CustomComment key={comment.id} comment={comment}/>
                            )): <Loader active inline='centered' />}
                        <br/><br/>
                        <Form onSubmit={this.handleCommentAdd}>
                            <fieldset>
                            <Form.Field>
                            <label>Author</label>
                            <input name='author' placeholder='UserName' />
                            </Form.Field>
                            <Form.Field>
                            <label>Comment</label>
                            <Form.TextArea name='body' placeholder='Comment Body'/>
                            </Form.Field>
                            <Button type='submit' content='Add Reply' labelPosition='left' icon='edit' primary />
                            </fieldset>
                        </Form>
                    </Comment.Group>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({allComments}) => {
    return {
        comments: Object.keys(allComments).map((key) => allComments[key]),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: ({id, title, body}) => dispatch(editPostAPI({id, title, body})),
        votePost: ({id, option}) => dispatch(votePostAPI({id, option})),
        getComments: (id) => dispatch(fetchAllComments(id)),
        addComment: ({parentId, author, body}) => dispatch(addCommentAPI({parentId, author, body})),
        deletePost: ({id}) => dispatch(deletePostAPI({id})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPost);