/**
 *
 *
 */
vds.import("vds.window.*", "vds.rpc.*");
var main = function () {
    try {
         return executeExpression();
    } catch (e) {
         throw e;
    }
    
}

var executeExpression = function() {
    var expression = "GetDataBaseType()";
    var result = null;

    vds.rpc.callCommandSync("WebExecuteFormulaExpression", null, {
        "isOperation": true,
        "operationParam": {
            "expression": expression
        },
        "success": function (rs) {
            result = rs.data.result;
        },
        "fail": function(e) {
            throw e;
        }
    });

return result;
}
export{    main}