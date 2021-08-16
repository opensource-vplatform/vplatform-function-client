/**
 * GetWidgetSize("WidgetCode", "height/width") 返回数值
 * 暂时只支持普通窗体面板和流布局
 */
vds.import("vds.exception.*", "vds.widget.*","vds.object.*");
var main = function (widgetCode, valueCode) {
    if (!widgetCode)
        throw vds.exception.newConfigException("函数 GetWidgetSize 第一个参数，控件Code不能为空！");

    if (!valueCode || (valueCode !== "height" && valueCode !== "width"))
        throw vds.exception.newConfigException("函数 GetWidgetSize 第二个参数，属性 Code 必须为 height 或者 width！");

    if (vds.object.isUndefOrNull(valueCode))
        return 0;
    else
        return vds.widget.execute(widgetCode, _genActionMethodName(valueCode));
}
export { main }

var _genActionMethodName = function (codeName) {
    return "get" + codeName.substring(0, 1).toUpperCase() + codeName.substring(1);
};