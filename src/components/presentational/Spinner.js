import React from 'react';
import {connect} from 'react-redux';

import { RingLoader } from 'react-spinners';
 


class Spinner extends React.Component {
  
  render() {
    const {isLoading} = this.props;
    const styles={
      position: "absolute",
      top:0,
      left:0,
      alignItems: "center",
      display:"flex",
      height: "100vh",
      justifyContent: "center",
      width: "100vw",
    };

    const z = {zIndex:1}

    return (
      <div style={isLoading?{...styles, ...z}:styles}>
        <RingLoader
          sizeUnit={"vh"}
          size={20}
          color={'#00FFFF'}
          // loading={true}
          loading={isLoading}
        />
      </div> 
    )
  }
};

const mapStateToProps=(state)=>({
    isLoading: state.spinner.isLoading
});

export default connect(mapStateToProps)(Spinner);