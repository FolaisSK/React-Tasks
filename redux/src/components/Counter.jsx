import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {increment, decrement} from "../slice/counterSlice.jsx";

const Counter = () => {

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
            <span>{count}</span>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
        </div>
    )
}

export default Counter