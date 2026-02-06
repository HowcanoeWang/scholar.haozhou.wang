<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import type { ScholarData } from '$lib/services/scholarService';

  // Recieve scholarData as prop
  let { data } = $props<{ data: ScholarData | null }>();

  let chartContainer: HTMLElement;
  let chartInstance: echarts.ECharts | null = null;

  $effect(() => {
    if (data && chartContainer) {
        initChart();
    }
  });

  function initChart() {
    if (!data) return;
    
    // Dispose if exists
    if (chartInstance) {
        chartInstance.dispose();
    }

    chartInstance = echarts.init(chartContainer);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '5%',
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.graph.map((item: { year: number; citations: number }) => item.year),
            axisLabel: {
                fontSize: 10,
                color: '#888' // Default color, check theme
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 10,
                color: '#888'
            },
            splitLine: {
                lineStyle: {
                    color: '#eee' // Light grid lines
                }
            }
        },
        series: [{
            data: data.graph.map((item: { year: number; citations: number }) => item.citations),
            type: 'bar',
            itemStyle: {
                color: '#ffffff' // White bars for dark bg, or check profile bg
            },
            label: {
                show: false,
                position: 'top',
                fontSize: 10
            }
        }]
    };

    // If text color needs to be white (because profile bg is dark), update it
    // Original site profile bg matches masthead bg-dark?
    // Let's check original. In original index.html masthead bg-dark text-white.
    // So axisLabel color should be white.
    option.xAxis.axisLabel.color = '#fff';
    option.yAxis.axisLabel.color = '#fff';
    option.yAxis.splitLine.lineStyle.color = 'rgba(255,255,255,0.2)';
    
    chartInstance.setOption(option);

    // Resize listener
    window.addEventListener('resize', resizeChart);
  }

  function resizeChart() {
    chartInstance?.resize();
  }
</script>

<div bind:this={chartContainer} style="width: 100%; height: 140px;"></div>
