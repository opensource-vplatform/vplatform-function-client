/**
 *
 *
 */
vds.import("vds.component.*");
var main = function () {

    var compCode = vds.component.getCode();
    return compCode ? compCode : "";
}
export{    main}