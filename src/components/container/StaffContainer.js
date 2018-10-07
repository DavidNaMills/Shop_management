import React from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';

import StaffSubTabs from '../presentational/StaffSubTabs';
import StaffItem from '../presentational/StaffItem';
import {fetchStaff, createStaff, updateLevel, deleteStaffMember} from '../../store/helpers/staffFetchers';



class StaffContainer extends React.Component{ 
    state={
        allStaff:[],
        selectedStaff:''
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.staff !== prevState.allStaff){
            return {
                allStaff: nextProps.staff,
                selectedStaff: nextProps.staff[0]
            }
        }
        return prevState;
    }

    componentDidMount(){
        this.props.allStaff();
    }
    

    getStaff=(id)=>{
        const staff = this.state.allStaff.filter(temp=>temp._id===id);
        this.setState({selectedStaff:staff[0]});
    }

    isSelected=(id)=>{
        if(this.state.selectedStaff==null){
            return false;
        }else if(id===this.state.selectedStaff._id){
            return true;
        }else{
            return false;
        }
    }


/***TODO:
 *  
 *  update secutity level
 *  block the account
 *  if account blocked, unblock it
 *  show blocked accounts in red
 *  filter 
 * 
 *  submit newly created staff
 *  clear new staff form
 */

    onSubmit=(values)=>{
        this.props.createStaff(values);
    }

    onUpdateLevel=(newLevel)=>{
        this.props.updateLevel(this.state.selectedStaff._id, newLevel);
    }

    deleteStaff=()=>{
        this.props.deleteStaffMember(this.state.selectedStaff._id);
    }

    render(){
        const {allStaff}=this.state;
        return(
        <div>
            <Col sm={2}>
            {allStaff.length>0&&allStaff.map(item=><StaffItem name={item.name} getStaff={this.getStaff} id={item._id} key={item._id} iselected={this.isSelected(item._id)}/>)}
            </Col>
            <Col sm={10}>
                <StaffSubTabs userName={this.props.name} staff={this.state.selectedStaff} deleteStaff={this.deleteStaff} onSubmit={this.onSubmit} onUpdateLevel={this.onUpdateLevel}/>
            </Col>
        </div>
);
    }

}

const mapStateToProps=(state)=>({
    name: state.auth.staff.name,
    staff: state.staff
})

const mapDispatchToProps=(dispatch)=>({
    allStaff: ()=>dispatch(fetchStaff()),
    createStaff: (values)=>dispatch(createStaff(values)),
    updateLevel: (level, id)=>dispatch(updateLevel(level, id)), 
    deleteStaffMember: (id)=>dispatch(deleteStaffMember(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StaffContainer);