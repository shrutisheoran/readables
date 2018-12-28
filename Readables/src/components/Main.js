import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button} from 'semantic-ui-react';
import PostList from './PostList';
import DetailedPost from './DetailedPost';
import { Route, withRouter, Link } from 'react-router-dom';

class Main extends Component {
    render() {
        const { categories, posts } =  this.props.Dashboard;
        const styleGrid = {
            padding: '20px',
            paddingBottom: '0',
        }
        return(
            <div className="main-page">
                 <Grid divided='vertically' style={styleGrid}>
                    <Grid.Row columns={1}>
                    <Grid.Column>
                        <h1 className='header'>Readables</h1>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                    <Grid.Column>
                            <Link to='/'><Button>Home</Button></Link>
                            {categories.map((category) => <Link key={category.name} to={`/${category.name}`}><Button>{category.name}</Button></Link>)}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Route exact path='/' render = {() => (
                    posts?
                    <PostList category='' posts = {posts}/>:''
                )}/>
                <Route exact path='/:category' render ={(match) => {
                    const content = posts.filter((post) => post.category===match.match.params.category);
                    return <PostList category = {match.match.params.category} posts = {content}/>
                }}/>
                <Route exact path = '/:category/:id' render = {(match) => {
                    if(match) {
                        const content = posts.filter((obj) => match.match.params.id===obj.id);
                        if(content.length>0) {
                            return <DetailedPost content = {content[0]} history = {this.props.history} category = {match.match.params.category}/>
                        }
                        else
                            return <h1 style={{textAlign: 'center'}}>ERROR 404<br/>NOT FOUND</h1>;
                    }
                }}/>
            </div>
        )
    }
}

function mapStateToProps ({ allCategories, allPosts }) {
    return {
      Dashboard: {
        categories: Object.keys(allCategories).map((name) => allCategories[name]),
        posts: Object.keys(allPosts).map((id) => allPosts[id]),
      }
    }
  }
    
  export default withRouter(connect(
    mapStateToProps,
  )(Main));