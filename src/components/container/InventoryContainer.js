import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import InvenSubTabs from '../presentational/InvenSubTabs';
import StaffItem from '../presentational/StaffItem';

import {updateInventory, addInventory, fetchInventory} from '../../store/helpers/inventoryFetchers';

class InventoryContainer extends React.Component{ 
    state={
        allInven:[],
        selectedInven: ''
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.inventory !== prevState.allInven){
            const x = nextProps.inventory.length;
            return {
                allInven: nextProps.inventory,
                selectedInven: x>0?nextProps.inventory[0]:''
            }
        }
        return prevState;
    }

    componentDidMount(){
        this.props.fetchInventory();
    }

    getInventory=(id)=>{
        const inven = this.state.allInven.filter(temp=>temp._id===id);
        this.setState({selectedInven:inven[0]});
    }

    isSelected=(id)=>{
        if(this.state.selectedInven==null){
            return false;
        }else if(id===this.state.selectedInven._id){
            return true;
        }else{
            return false;
        }
    }

    onSubmit=(values)=>{
        this.props.addInventory(values);
    }

    onUpdate=(newInfo)=>{
        alert(`Inventory ${this.state.selectedInven.name} level will be updated to ${newInfo}`)
    }

    onDelete=()=>{
        alert(`Will delete ${this.state.selectedInven.name}`)
    }

    changePrice=(newPrice)=>{
        this.update({retailPrice: newPrice});
    }

    changeQuantity=(quantity)=>{
        this.update({quantity});
    }

    update=(data)=>{
        this.props.updateInventory(data, this.state.selectedInven._id);
    }


    render(){
        const {allInven} = this.state;
        return(
            <div style={{paddingTop:'3vh'}}>
            <Row>
                <Col sm={2}>
                    {allInven.length>0&&allInven.map(item=><StaffItem name={item.name} getStaff={this.getInventory} id={item._id} key={item._id} iselected={this.isSelected(item._id)}/>)}
                </Col>
                <Col sm={10}>
                    <InvenSubTabs disabled={this.props.isLoading} inventory={this.state.selectedInven} changeQuantity={this.changeQuantity} changePrice={this.changePrice} onDelete={this.onDelete} onSubmit={this.onSubmit} onUpdate={this.onUpdate}/>
                </Col>
            </Row>
        </div>
);
    }

}

const mapStateToProps=(state)=>({
    name: state.auth.staff.name,
    inventory: state.inventory,
    isLoading: state.spinner.isLoading
});

const mapDispatchToProps=(dispatch)=>({
    updateInventory: (data, id)=>dispatch(updateInventory(data, id)), 
    addInventory: (data)=>dispatch(addInventory(data)),
    fetchInventory: ()=>dispatch(fetchInventory())
})

// export default StaffContainer;
export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);