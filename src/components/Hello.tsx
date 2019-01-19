import * as React from "react";
import {Student} from "./test";

export interface IHelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<IHelloProps, {}> {
    public componentDidMount() {
        console.log(Student);
    }
    public render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!2222</h1>;
    }
}
