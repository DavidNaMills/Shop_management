import {connect} from 'react-redux';

const Security = props =>{
    const test = +props.staffLevel>=(+props.level);

    return(
            test===true &&props.children
    )
}

const mapStateToProps=(state)=>({
    staffLevel: state.auth.staff.level
});

export default connect(mapStateToProps)(Security);