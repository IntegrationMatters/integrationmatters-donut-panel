import {TrendDirection} from "../types/trend-direction";

export class Styles {

  static getWrapperClassNames(prefix: string, height: number) {
    const wrapperClassNames: string[] = [
      `${prefix}-panel`
    ];

    if(prefix === "im-history") {
      if(height < 150) {
        wrapperClassNames.push("xxxs");
      } else if(height < 200) {
        wrapperClassNames.push("xxs");
      } else if(height < 260) {
        wrapperClassNames.push("xs");
      } else if(height < 335) {
        wrapperClassNames.push("s");
      }
    } else {
      if(height < 150) {
        wrapperClassNames.push("very-small");
      } else if(height < 200) {
        wrapperClassNames.push("small");
      }
    }

    return wrapperClassNames.join(" ");
  }

  static getChartClassNames(operator?: string, trendDirection: TrendDirection = "positive") {
    const classNames: string[] = [
      "chart"
    ];

    if(operator) {
      classNames.push(...this.addChangeOperatorClass(operator, trendDirection));
    }

    return classNames.join(" ");
  }

  private static addChangeOperatorClass(operator: string, trendDirection: TrendDirection) {
    const classNames: string[] = [];

    if(operator === "+") {
      if(trendDirection === "positive") {
        classNames.push("green");
      } else {
        classNames.push("red");
      }
    } else if(operator === "-") {
      if(trendDirection === "positive") {
        classNames.push("red");
      } else {
        classNames.push("green");
      }
    }

    return classNames;
  }

}
