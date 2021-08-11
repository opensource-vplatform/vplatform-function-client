/**
 *
 *
 */
vds.import("vds.object.*","vds.exception.*","vds.window.*");
var main = function (scopeId) {
    var FUNCNAME = "前台函数[IsExistWindowInstanceCode]-";
    //获取函数传入的参数
    var _result = true;
    //if(!CheckParamNum(FUNCNAME,args,1)) return false;
    if(vds.object.isUndefOrNull(scopeId)){
        throw vds.exception.newConfigException(FUNCNAME+"第一个参数为空,请检查配置！");
        return false;
    }
   
    if(vds.window.exist(scopeId)){
        _result = false;
    }
    return _result;
}
export{    main}