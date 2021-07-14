import { AbsoluteNumbers } from './absolute-numbers';

export class Percentages {
  static getPercentage(total: number, filtered: number) {
    const percentage = total > 0 ? (100 / total) * filtered : 0;

    return AbsoluteNumbers.fixNumber(percentage);
  }
}
