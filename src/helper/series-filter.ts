import { DataFrame } from '@grafana/data';
import { RefId } from '../types/ref-id';

export class SeriesFilter {
  static filterByRefId(series: DataFrame, refId: RefId) {
    return series.refId?.toLowerCase() === refId;
  }

  static findByType(series: DataFrame, type: string) {
    return series.fields.find((field) => {
      return field.type === type;
    });
  }

  static isSeriesVisible(dataFrames: DataFrame[], refId: RefId) {
    return !!dataFrames.find((series) => this.filterByRefId(series, refId));
  }
}
