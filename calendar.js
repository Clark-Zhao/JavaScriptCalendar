//配置可选年份的上下限
	var data = {
		startYear: "1970",
		endYear: "2070"
	},
//获取今天的年月日
		today = new Date(),
		nowYear = today.getFullYear(),
		nowMonth = today.getMonth() + 1,
		nowDate = today.getDate(),
//获取左右切换箭头
		preArrow = document.getElementsByClassName("preArrow")[0],
		nextArrow = document.getElementsByClassName("nextArrow")[0],
//获取年月选择框
		yearSelect = document.getElementsByClassName("year")[0],
		monthSelect = document.getElementsByClassName("month")[0],
//获取日历的tbody
		calendarTbody = document.getElementsByClassName("calendarTbody")[0];
//初始化日历
function init(){
	for (var i = data.startYear; i <= data.endYear; i++) {
		yearSelect.innerHTML += "<option>" + i + "</option>";
	}
	yearSelect.value = nowYear;
	monthSelect.value = nowMonth;
	createCalendar();
}
init();
//生成日历主体
function createCalendar(){
	//得到所选择年月的1号是星期几
	var startDay = new Date(yearSelect.value,monthSelect.value-1,1).getDay(),
	//得到所选择年月的最后一天是几号
		endDate = new Date(yearSelect.value,monthSelect.value,0).getDate(),
	//得到上个月的最后一天是几号
		lastEndDate = new Date(yearSelect.value,monthSelect.value-1,0).getDate(),
	//计算每一行生成的td是否到达七个，每七个换一行
		tdsNum = 0,
	//生成的内容
		calendarTbodyHTML = "<tr>";
	//生成上个月最后几天的单元格，直到该月的一号与其的星期对应
	for (var i = 0; i < startDay; i++) {
		calendarTbodyHTML += "<td class='disabledDate'>" + (lastEndDate-startDay+1+i) + "</td>";
		tdsNum++;
	}
	//生成当月日期
	for (var i = 1; i <= endDate; i++) {
		if (yearSelect.value==nowYear&&monthSelect.value==nowMonth&&i==nowDate) {
			calendarTbodyHTML += "<td class='todayDate'>" + i + "</td>";
		}else{
			calendarTbodyHTML += "<td>" + i + "</td>";
		}
		tdsNum++;
		if (tdsNum == 7){
			if(i == endDate){
				calendarTbodyHTML += "</tr>";
			}else{
				calendarTbodyHTML += "</tr><tr>";
			}
			tdsNum = 0;
		}
	}
	//用下月的头几天日期将表格补全
	if(tdsNum!==0){
		for (var i = 1; i <= 7-tdsNum; i++) {
			calendarTbodyHTML += "<td class='disabledDate'>" + i + "</td>";
		}
	}
	//将内容加到tbody中
	calendarTbody.innerHTML = calendarTbodyHTML;
}
//给选择框绑定单击事件
yearSelect.addEventListener("click",createCalendar);
monthSelect.addEventListener("click",createCalendar);
//给左右箭头绑定点击事件
preArrow.addEventListener("click",function(){
	if(yearSelect.value==data.startYear&&monthSelect.value==1){
		return;
	}else{
		if (monthSelect.value == 1) {
			yearSelect.value--;
			monthSelect.value = 12;
		}else{
			monthSelect.value--;
		}
		createCalendar();
	}
});
nextArrow.addEventListener("click",function(){
	if(yearSelect.value==data.endYear&&monthSelect.value==12){
		return;
	}else{
		if (monthSelect.value == 12) {
			yearSelect.value++;
			monthSelect.value = 1;
		}else{
			monthSelect.value++;
		}
		createCalendar();
	}
});
//当鼠标点击单元格时获取到对应的年月日
var todayYMD = {};
calendarTbody.addEventListener("click",function(e){
	e = e || window.event;
	//只有在被点击的目标节点是单元格时才执行下列操作
	if(e.target.nodeName.toUpperCase() == "TD"){
		//不是当月日期不可选
		if(e.target.className == "disabledDate"){
			return;
		}else {
			//每次点击的时候将之前选中的日期样式清除
			var tds = document.getElementsByTagName('td');
			for (var i = 0; i < tds.length; i++) {
				if(tds[i].className.indexOf("todayDate")>=0){
					tds[i].className = "todayDate";
				}else if(tds[i].className == "chooseDate"){
					tds[i].className = "";
				}
			}
			if(e.target.className == "todayDate"){
				e.target.className = "todayDate chooseDate";
			}else{
				e.target.className = "chooseDate";
			}
			todayYMD = {
				year: yearSelect.value,
				month: monthSelect.value,
				date: e.target.innerHTML
			};
		}
	}
});