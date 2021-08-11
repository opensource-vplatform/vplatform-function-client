/**
 *	流水号函数
 */
vds.import("vds.object.*","vds.rpc.*","vds.exception.*");
var main = function(TableName,TableColumn,prefix,Length,CoverLetter,likeValStr,subLength,isLeftSubFlag,isReuseSerialNumber) {

    if (vds.object.isUndefOrNull(TableName) || vds.object.isUndefOrNull(TableColumn) || vds.object.isUndefOrNull(prefix))
    throw vds.exception.newConfigException("传入参数不能为空，请检查");

    try {
        if (vds.object.isUndefOrNull(likeValStr))
            likeValStr = "";
        if (vds.object.isUndefOrNull(subLength))
            subLength = "";

        return executeExpression(TableName, TableColumn, prefix, Length, CoverLetter, likeValStr, subLength, isLeftSubFlag, isReuseSerialNumber);
    } catch (e) {
        throw vds.exception.newConfigException(e);
    }
}
export{    main}


var executeExpression = function(TableName, TableColumn, prefix, Length, CoverLetter, likeValStr, subLength, isLeftSubFlag, isReuseSerialNumber) {
    var expression = "GetSerialNumberFunc(\"" + TableName + "\",\"" + TableColumn + "\",\"" + prefix + "\",\"" + Length + "\",\"" + CoverLetter + "\",\"" + likeValStr + "\",\"" + subLength + "\",\"" + isLeftSubFlag + "\",\"" + isReuseSerialNumber + "\")",
        paramData = {"expression": expression},
        result = null;

     vds.rpc.callCommandSync("WebExecuteFormulaExpression",null,{
        "isOperation": true,
        "operationParam": paramData,
        "success": function(rs) {
            result = rs.data.result;
        },
        "error": function(e) {
            throw vds.exception.newConfigException(e);
        }
    });

    return result;
}