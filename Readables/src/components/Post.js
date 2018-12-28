import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Post extends Component {
    render() {
        const { id, author, voteScore, timestamp, title, body, category } = this.props.content;
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
                        <Link to={`/${category}/${id}`}>MoreInfo</Link>
                        </span>
                        <h3>{title}</h3>
                        <p>{body}</p>
                        </Feed.Summary>
                        <Feed.Meta>
                        <Feed.Like>
                            <Icon name='like' />
                            {voteScore}
                        </Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                    </Feed.Event>
                </Feed>
            </div>
        )
    }
}

export default Post;