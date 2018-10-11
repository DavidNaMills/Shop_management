import React from 'react';
import {Col, Row, Button, InputGroup, MenuItem, DropdownButton} from 'react-bootstrap';
import DisplayStaff from '../presentational/DisplayStaff';
import AddLocale from '../../locales/Context';


class UpdateStaffLevelForm extends React.Component{ 
    state={
        name: this.props.staff.name,
        level: +this.props.staff.level
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.name!== nextProps.staff.name){
            return{
                level: +nextProps.staff.level, 
                name:nextProps.staff.name
            };
        } else{
            return prevState;
        }
    }

    render(){
        const {staff, onUpdateLevel, deleteStaff, locale, userName} = this.props;
        const {level} = this.state;
        const origLevel =+staff.level;
        return(
            <div>
                 <Row>
                    <Col sm={5}>
                      <DisplayStaff staff={staff} />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5}>
                    <InputGroup>
                    <DropdownButton
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title="Update Security Level"
                      eventKey={level}
                      onSelect={(eventKey=>this.setState({level:+eventKey}))}
                      block
                    >
                        {locale.staff.LEVEL.map((item, val)=><MenuItem eventKey={val} key={val} active={val===level?true:false}>{item}</MenuItem>)}
                    </DropdownButton>
                  </InputGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col sm={5}>
                  {userName!==staff.name&&<Button bsStyle="success" disabled={(level===origLevel||this.props.disabled)&&true} onClick={()=>onUpdateLevel(level)} block> {level===origLevel?locale.staff.LEVEL[level] : `${locale.btns.updateLvl} ${locale.staff.LEVEL[level]}`}</Button>}
                  {userName!==staff.name&&<Button bsStyle="danger" onClick={()=>deleteStaff()} disabled={this.props.disabled}>{locale.btns.delete}</Button>}
                    </Col>
                  </Row>
            </div>
        );
    }

}

export default AddLocale(UpdateStaffLevelForm);