import {INCREMENT, DECREMENT} from './constants'


export const createIncrementAction = (data) => ({type:INCREMENT, data: data})
export const createDecrementAction = (data) => ({type:DECREMENT, data: data})
