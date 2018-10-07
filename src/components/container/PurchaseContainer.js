import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {ProgressBar, Button, Col, Row, Grid} from 'react-bootstrap';
import CustomerList from '../presentational/CustomerList';
import InventoryList from '../presentational/InventoryList';
import CheckPurchasePrice from '../presentational/CheckPurchasePrice';
import CompleteOrder from '../presentational/CompletedOrder';

import {fetchCustomers} from '../../store/helpers/customerFetchers';
import {fetchInventory} from '../../store/helpers/inventoryFetchers';
import {createPurchases} from '../../store/helpers/purchaseFetchers';
import AddLocale from '../../locales/Context';

const STAGES=['Select Customer', 'Select Product', 'Check Order', 'Completed'];
const DEFAULTS= {
    stage: 0,
    percent:25,
    customer: '',
    selectedItems:[]
};


class PurchaseContainer extends React.Component{ 
    state={
        allCust:[],
        allInven:[],


        stage: 0,
        percent:0,
        customer: '',
        selectedItems:[],
        refNo:'',
        completed: false
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            return {
                allInven: nextProps.inventory,
                allCust: nextProps.customers,
                stage: nextProps.message==='purchase_placed'?3:prevState.stage,
                percent: nextProps.message==='purchase_placed'?100:prevState.percent
            }
        }
        return prevState;
    }

    componentDidMount(){
        this.props.fetchCustomers();
        this.props.fetchInventory();
    }


    /**increases the stage: advances to the next stage*/
    increment=()=>this.setState((temp)=>({
        stage: temp.stage+1,
        percent:temp.percent+33,
    }));

    /**decreases the stage: advances to the next stage*/
    decrement=()=>this.setState((temp)=>({
        stage: temp.stage-1,
        percent:temp.percent-25,
    }));

    /**Resets the state */
    reset=()=>this.setState({
        ...DEFAULTS
    });

    setCustomer=(id)=>{
        const cust = this.state.allCust.filter(temp=>temp._id===id);
        this.setState({
            customer: cust[0]
        });
    }

    selectItem=(id, quantity, price, name)=>{
        let tempArray = this.state.selectedItems;

        if(tempArray.find(x=>x._id===id)){
            const finalArray = tempArray.map(x=>{
                if(x._id===id){
                    return{
                        ...x,
                        quantity: parseInt(quantity),
                        price: parseFloat(price)
                    };
                }else{
                    return x;
                }
            })
            this.setState({selectedItems:finalArray.filter(q=>q.quantity>0)});
        } else{
            if(quantity>0){
                tempArray.push({_id:id, quantity: parseInt(quantity), price: parseFloat(price), name});
                this.setState({selectedItems:tempArray});
            }
        }
    }

    disableNext=()=>{
        if(this.state.customer===''&&this.state.stage===0){
            return true;
        } else if(this.state.selectedItems.length===0 && this.state.stage===1){
            return true;
        } else{
            return false;
        }
    }

    confirmOrder=()=>{
        const {customer} = this.state;
        const s = this.state.selectedItems;
        const refNo=uuid();
        this.setState({refNo});

        this.props.createPurchases(s, customer, this.props.staff, refNo);
        if(this.state.completed){
            this.increment();
        }
    }

    render(){
        const {locale}=this.props;
        return(
        <Grid>
            <h3>{STAGES[this.state.stage]}</h3>
            <div><ProgressBar active now={this.state.percent} label={locale.purchase.STAGES[this.state.stage]} /></div>
            {
                this.state.stage!==3&&
                <div>
                    <Row>
                        <Col xs={2}>
                            <Button bsStyle="warning" onClick={this.decrement} block disabled={this.state.stage>0?false:true}>Back</Button>
                        </Col>
                        {this.state.stage<2&&
                            <Col xs={2}>
                                <Button bsStyle="primary" onClick={this.increment} block disabled={this.disableNext()}>Next</Button>
                            </Col>
                        }

                        {this.state.stage<2&&
                            <Col xs={1} smOffset={6}>
                                <Button bsStyle="danger"  onClick={this.reset} small="true">Clear</Button>
                            </Col>
                        }
                    </Row>
                </div>
            }
            {this.state.stage===0&& <div>{<CustomerList list={this.state.allCust} setCustomer={this.setCustomer} selected={this.state.customer}/>}</div>}
            {this.state.stage===1&& <div>{<InventoryList list={this.state.allInven} selectItem={this.selectItem} compiledList={this.state.selectedItems}/>}</div>}
            {this.state.stage===2&& <div><CheckPurchasePrice cancel={this.reset} confirmOrder={this.confirmOrder} selectedItems={this.state.selectedItems} customer={this.state.customer} staff={this.props.staff}/></div>}
            {this.state.stage===3&& <div><CompleteOrder completed={this.reset} refNo={this.state.refNo}/></div>}

        </Grid>
);
}

}

const mapStateToProps=(state)=>({
    staff: state.auth.staff,
    inventory: state.inventory,
    customers: state.customers,
    message : state.alert.msg
});

const mapDispatchToProps=(dispatch)=>({
    fetchCustomers: ()=>dispatch(fetchCustomers()),
    fetchInventory:()=>dispatch(fetchInventory()),
    createPurchases: (data, customer, staff, refNo)=>dispatch(createPurchases(data, customer, staff, refNo))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLocale(PurchaseContainer));