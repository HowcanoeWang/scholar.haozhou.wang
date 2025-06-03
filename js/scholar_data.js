///////////////////////
// parse scholar.json
///////////////////////

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

////////////////////////////
// parse publications.bib
////////////////////////////

fetch('./files/publications.bib')  // 替换为你的 .bib 文件路径
    .then(response => {
        if (!response.ok) {
            throw new Error('无法加载 publication.bib 文件');
        }
        return response.text();  // 注意：.bib 是文本文件，用 .text() 而不是 .json()
    })
    .then(bibContent => {
        // // 将report 替换成 inproceedings，不然parseToJSON识别不了
        // let bibContentRP = bibContent.replaceAll('@report', '@inproceedings');
        // // 还需要将最后的}加上，不然会报错（但是不影响解析）
        // bibContentRP = bibContentRP.replaceAll('}\n}', '},\n}');

        let parser = new window.BibLatexParser(bibContent, {processUnexpected: true, processUnknown: true})
        let bibjson = parser.parse()
        
        // 将数据存储在全局变量
        window.bibjson = bibjson;
        console.log('BibTeX 数据已加载:', window.bibjson);
    })
    .catch(error => {
        console.error('加载 .bib 文件时出错:', error);
        document.getElementById('bib-output').textContent = 
            '加载数据时出错: ' + error.message;
    });