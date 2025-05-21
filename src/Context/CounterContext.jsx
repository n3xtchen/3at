const { useState } = require("react");
const { createContext } = require("react");

export let counterContext = createContext();

export function CounterContextProvider(props){
let [counter, setcounter] = useState(0)

function increaseCounter(){
    setcounter(counter++)
}

    return <counterContext.Provider value={{counter,increaseCounter}}>
{props.children}
    </counterContext.Provider>
}