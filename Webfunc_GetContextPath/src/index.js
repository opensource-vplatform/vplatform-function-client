/**
 * 获取当前应用上下文：GetContextPath() 返回值等同 request.getContextPath的效果。
 */
vds.import("vds.environment.*");
var main = function() {
    var path = vds.environment.getContextPath();
    return path ? path : "";
}
export{    main}