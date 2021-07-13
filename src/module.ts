import { PanelPlugin } from '@grafana/data';
import { Donut } from './Donut';
import { DonatOptions } from './types/donat-options';

export const plugin = new PanelPlugin<DonatOptions>(Donut).setPanelOptions((builder) => {
  return builder
    .addStringArray({
      path: 'names',
      name: 'Names',
      category: ['Donut configuration'],
      defaultValue: ['on time', 'delayed'],
    })
    .addStringArray({
      path: 'colors',
      name: 'Colors',
      category: ['Donut configuration'],
      defaultValue: ['steelblue', 'darkorange', 'green', 'darkred', 'cyan', 'purple'],
    })
    .addNumberInput({
      path: 'strokeWidth',
      name: 'Thickness',
      category: ['Donut configuration'],
      defaultValue: 3.5,
      settings: {
        integer: false,
        step: 0.1,
        max: 10,
        min: 1,
      },
    });
});
