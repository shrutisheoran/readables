import React, { Component } from 'react';
import { editCommentAPI, voteCommentAPI, deleteCommentAPI } from '../actions';
import { Icon, Comment, Form, Header, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import serializeform from 'form-serialize';

class CustomComment extends Component {
    state = { modalEditOpen: false , modalDeleteOpen: false};
    handleEditOpen = () => this.setState({ modalEditOpen: true , modalDeleteOpen: false});
    handleEditClose = () => this.setState({ modalEditOpen: false, modalDeleteOpen: false });
    handleDeleteOpen = () => this.setState({ modalEditOpen: false , modalDeleteOpen: true});
    handleDeleteClose = () => this.setState({ modalEditOpen: false, modalDeleteOpen: false });
    commentUpVote = (e) => {
        e.target.style.color = 'blue';
        this.props.voteComment({id: this.props.comment.id, option: 'upVote'});
    }
    commentDownVote = (e) => {
        e.target.style.color = 'red';
        this.props.voteComment({id: this.props.comment.id, option: 'downVote'});
    }
    handleCommentEdit = (e) => {
        e.preventDefault();
        this.handleEditClose();
        const values = serializeform(e.target, {hash: true} );
        this.props.editComment({id: this.props.comment.id, body: values.body});
    }
    handleCommentDelete = (e) => {
        e.preventDefault();
        this.handleDeleteClose();
        this.props.deleteComment({id: this.props.comment.id});
    }
    render() {
        const { comment } = this.props;
        const { author, voteScore, timestamp, body} = comment;
        return(
        <Comment>
        <Comment.Content>
            <Comment.Author as='a'>{author}</Comment.Author>
            <Comment.Metadata>
            <div>{timestamp}</div>
            <Modal
                trigger={<Button style={{padding:'5px', marginRight: '10px'}} onClick={this.handleEditOpen} basic color='teal'>Edit</Button>}
                open={this.state.modalEditOpen}
                onClose={this.handleEditClose}
                basic
                size='small'
            >
                <Header icon='edit' content='Edit Your Comment'/>
                <Modal.Actions>
                <Form onSubmit={this.handleCommentEdit}>
                    <Form.Field>
                    <label style={{color: 'white'}}>Comment</label>
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
                <Header icon='delete' content='Delete Your Comment'/>
                <Modal.Actions>
                    <h2 style={{color: 'white'}}>Are you sure you want to delete it?</h2>
                    <Button onClick={this.handleCommentDelete}>Delete</Button>
                </Modal.Actions>
            </Modal>
            </Comment.Metadata>
            <Comment.Text>{body}</Comment.Text>
            <Comment.Actions>
            <Comment.Action>
                <Icon name='thumbs up outline' style={{cursor: 'pointer'}} onClick={this.commentUpVote}/>&ensp;
                <Icon name='thumbs down outline' style={{cursor: 'pointer'}} onClick={this.commentDownVote}/>&ensp;{voteScore}
                </Comment.Action>
            </Comment.Actions>
        </Comment.Content>
        </Comment>
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
        editComment: ({id, body}) => dispatch(editCommentAPI({id, body})),
        voteComment: ({id, option}) => dispatch(voteCommentAPI({id, option})),
        deleteComment: ({id}) => dispatch(deleteCommentAPI({id})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomComment);