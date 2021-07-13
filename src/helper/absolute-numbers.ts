import { DataFrame, Field, Vector } from '@grafana/data';
import { RefId } from '../types/ref-id';
import { SeriesFilter } from './series-filter';

export class AbsoluteNumbers {
  static getTotal(series: DataFrame[], refId: RefId) {
    return this.fixNumber(this.getValueFromSeries(series, refId), 0);
  }

  static fixNumber(value: number, decimal = 1) {
    return Number(value.toFixed(decimal));
  }

  private static getValueFromSeries(series: DataFrame[], refId: RefId) {
    return series
      .filter((series) => SeriesFilter.filterByRefId(series, refId))
      .map((series) => SeriesFilter.findByType(series, 'number'))
      .map((field) => this.getLastValue(field))
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
  }

  private static getLastValue(field?: Field<any, Vector<number>>) {
    if (!field) {
      return 0;
    }

    return field.values.get(field.values.length - 1);
  }
}
