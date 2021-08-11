/**
 * 获取日历控件当前的值
 * 范例：GetCurrentCalendarMonth("JGCalendar1")
 * 返回值 "yyyyMM"
 */
vds.import("vds.widget.*");
var main = function(expressionSrc) {

    var widget = vds.widget.getProperty(expressionSrc, "widgetObj");
    if (widget)
        return widget.getCurrentMonth();
    return null;
}
export{    main}