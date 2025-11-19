declare module "react-native-svg-charts" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";
  import { SvgProps } from "react-native-svg";

  export interface ChartProps {
    style?: ViewStyle;
    data: number[] | object[];
    svg?: SvgProps;
    contentInset?: { top?: number; bottom?: number; left?: number; right?: number };
    numberOfTicks?: number;
    yAccessor?: (props: any) => number;
    xAccessor?: (props: any) => number;
  }

  export class LineChart extends Component<ChartProps> {}
  export class BarChart extends Component<ChartProps> {}
  export class PieChart extends Component<ChartProps> {}
  export class Grid extends Component<any> {}
  export class YAxis extends Component<any> {}
  export class XAxis extends Component<any> {}
}
