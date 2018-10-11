import React from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';

import CustSubTabs from '../presentational/CustSubTabs';
import StaffItem from '../presentational/StaffItem';
import { fetchCustomers, createCustomer } from '../../store/helpers/customerFetchers';


class CustomerContainer extends React.Component{ 
    state={
        allCust:[],
        selectedCust:''
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.customers !== prevState.allCust){
            const x = nextProps.customers.length;
            return {
                allCust: nextProps.customers,
                selectedCust: x>0?nextProps.customers[0]:''
            }
        }
        return prevState;
    }

    componentDidMount(){
        this.props.fetchCustomers();
    }

    getStaff=(id)=>{
        const cust = this.state.allCust.filter(temp=>temp._id===id);
        this.setState({selectedCust:cust[0]});
    }

    isSelected=(id)=>{
        if(this.state.selectedCust==null){
            return false;
        }else if(id===this.state.selectedCust._id){
            return true;
        }else{
            return false;
        }
    }

    onSubmit=(values)=>{
        this.props.createCustomer(values, this.props.token)
    }

    onUpdate=(newInfo)=>{
        alert(`Customer ${this.state.selectedCust.name} level will be updated to ${newInfo}`)
    }

    deleteCustomer=()=>{
        alert(`Will delete ${this.state.selectedCust.name}`)
    }

    render(){
        const {allCust} = this.state;
        return(
            <div style={{paddingTop:'3vh'}}>
            <Col sm={2}>
                {allCust.length>0&&allCust.map(item=><StaffItem name={item.name} getStaff={this.getStaff} id={item._id} key={item._id} iselected={this.isSelected(item._id)}/>)}
            </Col>
            <Col sm={10}>
                <CustSubTabs disabled={this.props.isLoading} customer={this.state.selectedCust} deleteCustomer={this.deleteCustomer} onSubmit={this.onSubmit} onUpdate={this.onUpdate}/>
            </Col>
        </div>
);
    }

}

const mapStateToProps=(state)=>({
    customers: state.customers,
    isLoaded: state.spinner.isLoading
});

const mapDispatchToProps=(dispatch)=>({
    fetchCustomers: ()=>dispatch(fetchCustomers()),
    createCustomer: (values)=>dispatch(createCustomer(values))
})

// export default StaffContainer;
export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);