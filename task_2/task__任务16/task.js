/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqiList = "";
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.querySelector('#aqi-city-input').value.trim(),
        aqi = document.querySelector('#aqi-value-input').value.trim(),
        patternCity = /^[\u4e00-\u9fa5_a-zA-Z]+$/,
        patternAqi = /^[0-9]+$/;
    if ( patternCity.test( city ) && patternAqi.test( aqi ) ) {
        aqiData[city] = aqi;
    } else {
        alert( "您的输入不符合要求" );
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.querySelector('#aqi-table');
    var aqiList = "<tr>\
                   <td>城市</td><td>空气质量</td><td>操作</td>\
                 </tr>";
    for (var city in aqiData) {
        aqiList += "<tr>\
                      <td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td>\
                    </tr>";
    }
    aqiTable.innerHTML = aqiList;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var city = target.parentNode.parentNode.children[0].innerHTML; // Notes: firstChild会选中不存在的文本节点
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.querySelector('#add-btn');
  addBtn.addEventListener('click', addBtnHandle, false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.querySelector('#aqi-table');

  aqiTable.addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === "BUTTON") {
        delBtnHandle(e.target);
    }
  }, false)
}

init();
