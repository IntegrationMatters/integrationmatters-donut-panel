import { DataFrame } from '@grafana/data';
import { DonutTemplate } from '../donut-template';
import { RefId } from '../types/ref-id';
import { AbsoluteNumbers } from './absolute-numbers';
import { Percentages } from './percentages';
import { SeriesFilter } from './series-filter';

export class CircleGenerator {
  private static QUERIES: readonly string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  private total = 0;
  private visibleQueries: boolean[] = [];
  private totalPerQuery: number[] = [];
  private percentagesPerQuery: number[] = [];
  private offsets: number[] = [];
  private circles: any[] = [];
  private legendList: any[] = [];

  constructor(
    private readonly strokeWidth: number,
    private readonly names: readonly string[],
    private readonly colors: readonly string[]
  ) {}

  private static detectVisibleQueries(series: DataFrame[], query: RefId) {
    return SeriesFilter.isSeriesVisible(series, query);
  }

  private static calculateTotal(series: DataFrame[], query: RefId) {
    return AbsoluteNumbers.getTotal(series, query);
  }

  private static calculatePercentage(total: number, queryTotal: number) {
    return Percentages.getPercentage(total, queryTotal);
  }

  private static calculateOffset(previousOffset?: number, previousPercentage?: number) {
    let offset = 25;
    if (typeof previousPercentage === 'number' && typeof previousOffset === 'number') {
      offset = previousOffset - previousPercentage;
    }

    return offset;
  }

  calculate(series: DataFrame[]) {
    CircleGenerator.QUERIES.forEach((query) => {
      this.visibleQueries.push(CircleGenerator.detectVisibleQueries(series, query));
      this.totalPerQuery.push(CircleGenerator.calculateTotal(series, query));
    });

    this.total = this.totalPerQuery.reduce((previous, current) => previous + current, 0);

    CircleGenerator.QUERIES.forEach((query, queryIndex) => {
      this.percentagesPerQuery.push(CircleGenerator.calculatePercentage(this.total, this.totalPerQuery[queryIndex]));
      this.offsets.push(
        CircleGenerator.calculateOffset(this.offsets[queryIndex - 1], this.percentagesPerQuery[queryIndex - 1])
      );

      if (this.visibleQueries[queryIndex]) {
        const name = this.names[queryIndex] || '';
        const color = this.colors[queryIndex] || 'gray';

        this.circles.push(
          DonutTemplate.getTemplate({
            offset: this.offsets[queryIndex],
            strokeWidth: this.strokeWidth,
            percentage: this.percentagesPerQuery[queryIndex],
            color,
          })
        );
        this.legendList.push(DonutTemplate.getLegend(name, color));
      }
    });
  }

  getTotal() {
    return this.total;
  }

  getCircles() {
    return this.circles.slice();
  }

  getLegendList() {
    return this.legendList.slice();
  }
}
