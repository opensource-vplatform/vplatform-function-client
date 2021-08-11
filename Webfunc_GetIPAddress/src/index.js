/**
 * GetIPAddress 返回当前客户端的IP地址（注意返回的是服务器端获取到的请求IP地址） 代码示例:GetIPAddress() 返回值为当前在线的IP地址 无参数 返回类型：字符串
 */
vds.import("vds.rpc.*", "vds.exception.*");
var main = function() {
    try {
        var expression = "GetIPAddressFunc()";
        var findParam = {
            "expression": expression
        }
        var result;
        vds.rpc.callCommandSync("WebExecuteFormulaExpression",null,{
            "isOperation":true,
            "operationParam": findParam,
            "success": function(rs) {
                result = rs.data.result;
            }
        });
        return result;
    } catch (e) {
        throw vds.exception.newConfigException("函数执行失败");
    }
}
export{    main}