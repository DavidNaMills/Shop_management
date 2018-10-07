import React, {Component} from 'react';
import chinese from './chinese';
import english from './english';

export const Locale = React.createContext(chinese);

const AddLocale = (ComposedComponent) => {
    class Authenticate extends Component {
        state={
            language: english
        }

        render() {
        return(
            <Locale.Provider value={this.state.language}>
                <Locale.Consumer>{locale=>
                    <ComposedComponent {...this.props} locale={locale} />
                }</Locale.Consumer>
            </Locale.Provider>
        );
      }
    }
    return Authenticate;
  };
   
  export default AddLocale;