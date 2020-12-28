import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';




 // Create the Selected campite method to show it after the user clicks 
  function RenderCampsite({campsite}) {
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
    function RenderComments({comments}) {      
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
            </div>
          );
        }
    } 
        

   // Paint the Selected campsite and comments at the bottom of the screen
   function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.campsite.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;