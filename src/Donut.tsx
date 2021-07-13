import { PanelProps } from '@grafana/data';
import React from 'react';
import { Styles } from '../../shared/helper/styles';
import './Donut.scss';
import { CircleGenerator } from './helper/circle-generator';
import { DonatOptions } from './types/donat-options';

export const Donut: React.FC<PanelProps<DonatOptions>> = ({ width, height, data, options }) => {
  const wrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const circleGenerator = new CircleGenerator(options.strokeWidth, options.names, options.colors);
  circleGenerator.calculate(data.series);

  const total = circleGenerator.getTotal();
  const wrapperClassNames = Styles.getWrapperClassNames('im-donut', height);
  const chartClassNames = Styles.getChartClassNames();

  return (
    <div style={wrapperStyle} className={wrapperClassNames}>
      <div className="main-text">
        <span className="percentage" style={{ fontSize: 0.3 * height - 6 * total.toString().length + 'px' }}>
          {total}
        </span>
      </div>

      <svg className={chartClassNames} key={height} viewBox="0 0 42 42">
        {circleGenerator.getCircles()}
      </svg>

      <div className="legend-list">{circleGenerator.getLegendList()}</div>
    </div>
  );
};
