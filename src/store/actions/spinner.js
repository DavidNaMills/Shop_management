import {START_LOADER, STOP_LOADER} from './action_types/spinner';

export const startLoader=()=>({
    type:START_LOADER
});

export const endLoader=()=>({
    type: STOP_LOADER
});