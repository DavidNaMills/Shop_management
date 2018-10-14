import React, {Component} from 'react';
import {connect} from 'react-redux';
import chinese from './chinese';
import english from './english';

export const Locale = React.createContext(chinese);

const AddLocale = (ComposedComponent) => {
  
    class Authenticate extends Component {
        constructor(props){
            super(props);
            this.state={
                language: this.props.language
            };
        }

        returnLanguage(){
            switch(this.props.language){
                case 'en': return english;
                case 'zh': return chinese;
                default: return english;
            }
        }

        render() {

        return(
            <Locale.Provider value={this.returnLanguage()}>
                <Locale.Consumer>{locale=>
                    <ComposedComponent {...this.props} locale={locale} />
                }</Locale.Consumer>
            </Locale.Provider>
        );
      }
    }

    const mapStateToProps=(state)=>({
        language:state.language.lan
      });

    return connect(mapStateToProps)(Authenticate)
  };
  
  export default AddLocale;