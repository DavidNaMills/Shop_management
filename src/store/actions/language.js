import {CHNG_LANG} from './action_types/language';

export const changeLanguage=(lan)=>({
    type: CHNG_LANG,
    payload: lan
});