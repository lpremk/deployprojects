import { useState } from "react";
import ChildComponent from "./ChildComponent";

export default function ParentComponent(){
    const [data, setData] = useState('initial');

    const childToParent = () => {
   
    }
    return (<>
        {/* <h3>Parent Component</h3> */}
        <ChildComponent childToParent={childToParent}/>
        <div>
        {/* <button onClick={() => parentToChild()}>Click Parent</button> */}
      </div>
    </>)
}