import {COMPLETED, RESET} from './action_types/purchases';

export const completedPurchase=()=>({
    type: COMPLETED
})

export const resetPurchase=()=>({
    type: RESET
})