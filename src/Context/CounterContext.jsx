import React, { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props){
    const [counter, setCounter] = useState(20);

    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {props.children}
        </CounterContext.Provider>
    );
}
