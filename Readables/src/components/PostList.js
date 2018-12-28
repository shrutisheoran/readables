import React, { Component } from 'react';
import { Grid, Button, Header, Modal, Form} from 'semantic-ui-react';
import { addPostAPI } from '../actions';
import Post from './Post';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

class PostList extends Component {
    state = {
        modalOpen: false,
        category: '',
    }
    handleOpen = () => this.setState({modalOpen: true, category: this.props.category});
    handleClose = () => this.setState((prevState) => {
        return {...prevState, modalOpen: false};
    });
    handleChange = (e) => {
        const value = e.target.value;
        this.setState((prevState) => {
            return {...prevState, category: value};
        });
    }
    handlePostEdit = (e) => {
        e.preventDefault();
        this.handleClose();
        const values = serializeForm( e.target, {hash: true});
        this.props.addPost({title: values.title, body: values.body, author: values.author, category: values.category });
    }

    render() {
        const posts =  this.props.posts.filter((post) => post.deleted === false);
        return(
            <div className="post-list">
                <Grid>
                    <Grid.Row>
                    <Grid.Column>
                        <Modal
                            trigger={<span style={{float: 'right', marginTop: '-20px'}}>
                            <Button style={{padding: '10px'}} onClick={this.handleOpen} basic color='orange'>Post Something</Button>
                            </span>}
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic
                            size='small'
                        >
                            <Header icon='add' content='Add Post'/>
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
                                <Form.Field>
                                <label style={{color: 'white'}}>Author</label>
                                <input name='author' placeholder='UserName' />
                                </Form.Field>
                                <Form.Field>
                                <label style={{color: 'white'}}>Category</label>
                                <input name='category' value={this.state.category} onChange={this.handleChange}/>
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                            </Form>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                    <Grid.Column>
                        {
                            posts?
                            posts.map((post, index)=><Post key={index} content = {post}/>):''
                        }
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {};
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: ({title, body, author, category}) => dispatch(addPostAPI({title, body, author, category})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);