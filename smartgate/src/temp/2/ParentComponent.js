import { useState } from "react";
import ChildComponent from "./ChildComponent";

export default function ParentComponent(){
    const [data, setData] = useState('initial');

    const parentToChild = () => {
        setData("This is data from Parent Component to the Child Component.");
      }
    return (<>
        {/* <h3>Parent Component</h3> */}
        <ChildComponent parentToChild={data}/>
        <div>
        <button onClick={() => parentToChild()}>Click Parent</button>
      </div>
    </>)
}