const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')  //从本地的存储读取x的值
const xObject = JSON.parse(x)  //把字符串变成对象
const hashMap = xObject || [  //如果xObject存在就使用，否则使用默认
    { logo: 'B', url: ' https://www.bilibili.com/' },
    { logo: 'I', url: ' https://www.iqiyi.com/' }
]  //创建hashMap数组
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('.com', '')
        .replace(/\/.*/, '') // 正则表达式，删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()  //找到li元素除最后一个删除
    hashMap.forEach((node, index) => {
        const $li = $(` <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)  //遍历hashMap数组，并在lastli前面添加$li内容
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    });
}
render()
$('.siteAdd') //选择siteAdd元素
    .on('click', () => {  //监听点击事件
        let url = window.prompt('请输入要添加的网址')  //点击弹出对话框
        if (url.indexOf('http') !== 0) { //如果url中http不存在索引0中
            url = 'https://' + url  //在url前面添加内容
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        });  //hashMap中添加内容
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)  //让hashMap转变为字符串
    localStorage.setItem('x', string)  //在本地存储里面设定x，值为string
}