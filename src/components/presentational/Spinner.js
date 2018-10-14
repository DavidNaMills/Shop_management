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
      zIndex:-9999
    };

    // const z = {zIndex:1, backgroundColor:'rgb(214, 255, 227, 0.4)'}
    const z = {zIndex:999, backgroundColor:'rgb(89, 108, 255, 0.2)'}

    return (
      <div style={isLoading?{...styles, ...z}:styles}>
        <RingLoader
          sizeUnit={"vh"}
          size={20}
          color={'#00FFFF'}
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