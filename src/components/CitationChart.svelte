<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as echarts from 'echarts';
  import type { ScholarData } from '$lib/services/scholarService';

  // Recieve scholarData as prop
  let { data } = $props<{ data: ScholarData | null }>();

  let chartContainer: HTMLElement;
  let chartInstance: echarts.ECharts | null = null;
  let observer: MutationObserver | null = null;

  $effect(() => {
    if (data && chartContainer) {
        initChart();
    }
  });

  onDestroy(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }
    if (observer) {
        observer.disconnect();
    }
    window.removeEventListener('resize', resizeChart);
  });

  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    // Use fallback if var not found, but it should be there.
    // ECharts needs hex/rgb, CSS vars might return " #fff " or similar.
    // Accessing via a temp element or assuming standard tailwind colors if needed.
    // Better: use the values directly if they are hex.
    // Our app.css vars: --foreground: #..., --muted-foreground: #...
    // But getComputedStyle('--foreground') might return valid color string.
    
    // Helper to resolve CSS var
    const getColor = (varName: string) => {
       return style.getPropertyValue(varName).trim();
    };

    return {
       textColor: getColor('--muted-foreground') || '#888',
       axisColor: getColor('--border') || '#eee',
       barColor: getColor('--foreground') || '#000',
       splitLineColor: getColor('--border') || '#eee' // use border color for split lines with low opacity
    };
  }

  function initChart() {
    if (!data) return;
    
    if (chartInstance) {
        chartInstance.dispose();
    }

    chartInstance = echarts.init(chartContainer);
    
    updateChartOption();

    // Resize listener
    window.addEventListener('resize', resizeChart);

    // Watch for theme changes
    observer = new MutationObserver(() => {
        // Theme changed, update chart colors
        updateChartOption();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  }

  function updateChartOption() {
      if (!chartInstance || !data) return;
      
      const colors = getThemeColors();

      const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--card').trim(),
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border').trim(),
            textStyle: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground').trim()
            }
        },
        grid: {
            top: '10%',
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
                color: colors.textColor,
                fontFamily: 'Nunito, sans-serif'
            },
            axisLine: {
                lineStyle: {
                    color: colors.axisColor
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 10,
                color: colors.textColor,
                fontFamily: 'Nunito, sans-serif'
            },
            splitLine: {
                lineStyle: {
                    color: colors.splitLineColor,
                    opacity: 0.3
                }
            }
        },
        series: [{
            data: data.graph.map((item: { year: number; citations: number }) => item.citations),
            type: 'bar',
            itemStyle: {
                color: colors.barColor,
                borderRadius: [4, 4, 0, 0]
            },
            label: {
                show: false,
                position: 'top',
                fontSize: 10
            }
        }]
    };
    chartInstance.setOption(option);
  }

  function resizeChart() {
    chartInstance?.resize();
  }
</script>

<div bind:this={chartContainer} style="width: 100%; height: 140px;"></div>
