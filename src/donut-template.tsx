import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DonutTemplateRequest } from './donut-template-request';

export class DonutTemplate {
  static RADIUS = 100 / (2 * Math.PI);

  static getTemplate(request: DonutTemplateRequest) {
    return (
      <circle
        style={{ stroke: request.color }}
        cx="21"
        cy="21"
        r={DonutTemplate.RADIUS}
        fill="transparent"
        strokeWidth={request.strokeWidth}
        strokeDasharray={`${request.percentage} ${100 - request.percentage}`}
        strokeDashoffset={request.offset}
      />
    );
  }

  static getLegend(name: string, color: string) {
    return (
      <div className="legend">
        <FontAwesomeIcon icon={faClock} style={{ color }} />
        <span>{name}</span>
      </div>
    );
  }
}
