// 使用 fetch API 加载 JSON 文件
fetch('./files/scholar.json')  // 替换为你的 JSON 文件路径
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(data => {
        // 将数据赋值给 window.scholarData
        window.scholarData = data;
        console.log('数据已加载:', window.scholarData);

        // 填充数据到 span 元素
        document.getElementById('scholar-totalcite').textContent = window.scholarData.table[0].citations.all;
        document.getElementById('scholar-hindex').textContent =window.scholarData.table[1].h_index.all;

        // 创建echarts表格
        createEchartScholar();

    })
    .catch(error => {
        console.error('加载数据时出错:', error);
        document.getElementById('data-container').textContent = 
            '加载数据时出错: ' + error.message;
    });

function createEchartScholar() {
    const scholarData = window.scholarData;

    const chart = echarts.init(document.getElementById('citationChart'));
    console.log( '{a|' + i18next.t('prof.cite') + ':} {b|313} {a|' + i18next.t('prof.hidx') + ':} {b|8}' )
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '3%',
            bottom: '3%',  // Increased bottom margin for legend
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: scholarData.graph.map(item => item.year),
            axisLabel: {
                fontSize: 10,
                color: '#FFFFFF'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 10,
                color: '#FFFFFF'
            }
        },
        series: [{
            data: scholarData.graph.map(item => item.citations),
            type: 'bar',
            itemStyle: {
                color: '#FFFFFF'
            },
            label: {
                show: false,
                position: 'top',
                fontSize: 10
            }
        }],
    };
    chart.setOption(option);
}