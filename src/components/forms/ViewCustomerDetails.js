import React from 'react';
import {Col, Row} from 'react-bootstrap';
import DisplayCustomer from '../presentational/DisplayCustomer';


class ViewCustomerDetails extends React.Component{ 
    state={
        name: this.props.customer.name
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.name!== nextProps.customer.name){
            return{
                name:nextProps.customer.name
            };
        } else{
            return prevState;
        }
    }

    render(){
        const {customer} = this.props;

        return(
            <div>
                 <Row>
                    <Col sm={5}>
                      <DisplayCustomer customer={customer} />
                    </Col>
                  </Row>
            </div>
        );
    }
    
}

export default ViewCustomerDetails;