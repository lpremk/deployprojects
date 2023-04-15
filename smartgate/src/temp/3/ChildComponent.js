export default function ChildComponent(props){
    return (<>
            <h6>child component</h6>
           {props.parentToChild}
    </>)
}