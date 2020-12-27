import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


// Create CampsiteInfo Component
class CampsiteInfo extends Component {

 // Create the Selected campite method to show it after the user clicks 
    renderCampsite(campsite) {
        if (campsite) {
            return (
            <div className="col-md-5 m-1">
                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardTitle>{campsite.name}</CardTitle>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>               
            </div>
            )
        }
    }

    // Create a Comments method to iterate through the array of comments
    renderComments(comments) {      
        if (comments) {
        return (
            <div className="col-md-5 m-1">
             <h4>Comments</h4>   
              {
              comments.comments.map(comment => <div key={comment.id}>{comment.text} <br/>
              {comment.author},&nbsp;
               {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} <br/> <br/>
              </div>
              )
              }
            </div>
          );
        }
    } 
        

   // Paint the Selected campsite and comments at the bottom of the screen
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderCampsite(this.props.campsite)} 
                    {this.renderComments(this.props.campsite)}                     
                </div>
            </div>    

        );
    }
}


export default CampsiteInfo;