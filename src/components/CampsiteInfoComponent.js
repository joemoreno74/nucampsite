import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const onChange = val => val && val > "0";



class CommentForm extends Component {
    constructor(props) {
        super(props);
     this.state = {
            rating: '',
            author: '',
            text: '',
            touched: {
                author: false,
            },
        isModalOpen: false 
        };     
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit = (values) => {
                this.toggleModal();
                this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text) 
            }


    render (){ 
        return (
            <React.Fragment>
                <Button outline className="fa-lg" onClick={this.toggleModal}><FontAwesomeIcon icon={faPencilAlt} />{'  '}Submit Comment</Button>  
                <ShowModal state={this.state} handleSubmit={this.handleSubmit} />
            </React.Fragment>

        )         
    } 

}


function ShowModal(props) {
    return (
    <Modal isOpen={props.state.isModalOpen}>
        <ModalHeader >Submit Comment</ModalHeader>
            <ModalBody>
                    <LocalForm onSubmit={values => props.handleSubmit(values)}>  
                            <div className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control" validators={{
                                            onChange
                                        }}>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            onChange: 'Required'
                                        }}
                                    />                                 
                            </div>

                            <div className="form-group">
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text" >Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".text"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                            </div>                           
                            <div className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </div>                                          
            </LocalForm>
        </ModalBody>
</Modal> 
    )
}

 // Create the Selected campite method to show it after the user clicks 
  function RenderCampsite({campsite}) {
        if (campsite) {
            return (
            <div className="col-md-5 m-1">
                    <Card>
                        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />  
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>               
            </div>
            )
        }
    }

    // Create a Comments method to iterate through the array of comments
    function RenderComments({comments, addComment, campsiteId}) {    
        if (comments) {
        return (
            <div className="col-md-5 m-1">
             <h4>Comments</h4>   
              {
              comments.map(comment => <div key={comment.id}>{comment.text} <br/>
              {comment.author},&nbsp;
               {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} <br/> <br/>
              </div>
              )
              }
               <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
          );
        }
    } 
        

   // Paint the Selected campsite and comments at the bottom of the screen
   function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }      
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;