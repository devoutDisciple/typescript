import * as React from "react";
import {Student} from "./test";

export interface IHelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<IHelloProps, {}> {
    public componentDidMount() {
        const num1 = 6;
        const num2 = 0xF00D;
        const num3 = 0b1010;
        const num4 = 0o744;
        console.log(num1, num2, num3, num4);
        const list: number[] = [1, 2, 3];
        const list2: string[] = ["hello", "world"];
        const hello: [string, number] = ["hello", 10];
        enum Color {Red = 1, blue = 4}
        const c: Color = Color.Red;
        console.log(c);
        const colorName: string = Color[1];
        console.log(colorName);
        // console.log(Student);
        const obj: any = "skjfkdjfl";
        interface Ihello {
            readonly x: number;
            y: number;
        }
        const p1: Ihello = {
            x: 13,
            y: 32,
        };
    }
    public render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!2222</h1>;
    }
}
