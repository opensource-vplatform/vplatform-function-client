/**
 *	将实体中某个字段值拼接成一个字符串
 */
vds.import("vds.object.*", "vds.ds.*", "vds.exception.*","vds.expression.*");
var main = function(dsName,columnName,separator,selectType,isNullFilter,isUnique) {
    if (vds.object.isUndefOrNull(dsName))
        throw new Error("实体名称不允许为空，请检查");

    if (vds.object.isUndefOrNull(isNullFilter))
        isNullFilter = false;

    if (vds.object.isUndefOrNull(columnName))
        return "";

    if (vds.object.isUndefOrNull(separator))
        separator = ";"; //为空默认取分号

    // 兼容原有函数
    if (null == selectType || undefined == selectType)
        selectType = 0; // 0：全部记录；1：选中记录；默认为0。原有为0。

    //从DB中取值
    var records;
    var datasource = null;
    //		if(vds.ds.isDatasource(tableName)){
    //			datasource = tableName;
    //		}else{
    //			datasource = vds.ds.lookup(tableName);
    //		}
    if (vds.ds.isDatasource(dsName)) {
        datasource = dsName;
    } else {
        if (dsName.indexOf(".") == -1 && dsName.indexOf("@") == -1) {
            datasource = vds.ds.lookup(dsName);
        } else {
            datasource = vds.expression.execute(dsName);
        }
    }
    if(!datasource)
        throw vds.exception.newConfigException("无法获取实体【"+dsName+"】, 请检查实体是否存在");
    if (selectType == 1)
        records = datasource.getSelectedRecords();
    else
        records = datasource.getAllRecords(); // 默认0

    var retStr = "";
    if (null != records && records.toArray().length > 0) {
        records = records.toArray();
        sortDatas(records, datasource.getMetadata().getCode());
        var arr = new Array();
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var temValue = record.get(columnName);
            if (isUnique) {
                if (!contains(arr, temValue)) {
                    arr.push(temValue);
                    if (isNullFilter) {
                        if (!vds.object.isUndefOrNull(temValue)) {
                            if (retStr == "")
                                retStr = temValue;
                            else
                                retStr = retStr + separator + temValue;
                        }
                    } else {
                        if (i == 0 && retStr == "")
                            retStr = temValue;
                        else
                            retStr = retStr + separator + temValue;
                    }
                }
            } else {
                if (isNullFilter) {
                    if (!vds.object.isUndefOrNull(temValue)) {
                        if (retStr == "")
                            retStr = temValue;
                        else
                            retStr = retStr + separator + temValue;
                    }
                } else {
                    if (i == 0 && retStr == "")
                        retStr = temValue;
                    else
                        retStr = retStr + separator + temValue;
                }
            }



        }
    } else
        return null;

    return retStr;
}
/**
 * 根据控件排序信息对数据进行排序
*/
function sortDatas(datas, dsName){
    var widgetCodes = vds.widget.getWidgetCodes(dsName);
    if(widgetCodes instanceof Array && widgetCodes.length > 0){
        for(var i = 0,len = widgetCodes.length;i<len;i++){
            var code = widgetCodes[i];
            var storeType = vds.widget.getStoreType(code);
            var widget = vds.widget.getProperty(code, "widgetObj");
            if(storeType != vds.widget.StoreType.Set || !widget || typeof(widget.getSortedDatas) != "function"){
                continue;
            }
            var sortInfos = widget.getSortedDatas();
            if(sortInfos instanceof Array){
                var map = {};
                for(var j = 0; j < sortInfos.length; j++){
                    var info = sortInfos[j];
                    map[info.id] = info.index;
                }
                datas.sort(function(a, b){
                    var id1 = a.get("id");
                    var id2 = b.get("id");
                    var i1 = map[id1];
                    var i2 = map[id2];
                    if(undefined == i1){
                        if(undefined == i2){
                            return (id1> id2 ? 1 : -1);
                        }
                        return 1;
                    }else if(undefined == i2){
                        return -1;
                    }else{
                        return (i1 > i2 ? 1 : -1)
                    }
                });
                break;
            }
        }
    }
}
function contains(arr, obj) {
    var i = arr.length;
    if (i > 0) {
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
    }
    return false;
}
export{    main}