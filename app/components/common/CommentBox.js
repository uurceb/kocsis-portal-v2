import React, { Component } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal'
import Constants from '../../constants'
import { ModalManager } from 'react-dynamic-modal';

const url = Constants.serviceUrl;

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { _id: props.objectId, comments: [], formData: { newComment: '' } }
        this.loadCommentsData.bind(this);
        this.onAddComment.bind(this);
    }
    loadCommentsData() {
        let _this = this;
        fetch(url + '/comments/getCommentsByObjectId/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ comments: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    onAddComment() {
        fetch(url + '/comments/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _object: this.state._id,
                _user: '598b1df01d9df12e38931338',
                text: this.state.formData.newComment
            })
        }).then(() => {
            this.loadCommentsData();
            this.setState({ formData: { newComment: '' } });
        }).catch((e) => {
            console.log(e);
        });;
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
    }
    componentDidMount() {
        this.loadCommentsData();
    }
    handleKeyPress(e){
        if (e.key==='Enter')
            this.onAddComment();
    }
    render() {
        const { formData } = this.state;
        return (
            <div className="feed-activity-list">
                {this.state.comments.map((comment, index) =>
                    <Comment comment={comment} key={index} onDelete={() => this.loadCommentsData()} />)
                }
                <div className="feed-element" >
                    <div className="well">
                        <label htmlFor="commentText">Write Comment</label>
                        <input className="form-control" type="textfield" value={formData.newComment} onKeyPress={(e)=>this.handleKeyPress(e)} id="commentText" onChange={(e) => this.onDataChange("newComment", e.target.value)} />
                        <small className="pull-right"><button onClick={() => this.onAddComment()}>Send</button></small>
                    </div>
                </div>
            </div>
        );
    }
}


class Comment extends Component {
    constructor(props) {
        super(props);
        this.delete.bind(this);
    }
    delete() {
        let _this=this;
        fetch(url + '/comments/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _this.props.comment._id,
            })
        }).then(function () {
            _this.props.onDelete();
        }).catch(function () {
            console.log("errore");
        });;
    }
    onDelete() {
        ModalManager.open(
            <DeleteConfirmModal onConfirm={() => this.delete()} />);
    }
    render() {
        const { comment } = this.props;
        return (
            <div className="feed-element">
                <a href="#" className="pull-left">
                    <img alt="image" className="img-circle" src={"img/" + comment._user.username + ".jpg"} />
                </a>
                <div className="media-body ">
                    <small className="pull-right"><a style={{ color: 'gray' }} onClick={() => this.onDelete()}><i className="fa fa-times"></i></a></small>
                    <strong>{comment._user.name}</strong> wrote a comment <br />
                    <small className="text-muted">Today 2:10 pm - 12.06.2014</small>
                    <div className="well">
                        {comment.text}
                    </div>
                </div>
            </div>
        );
    }
}


export default CommentBox;