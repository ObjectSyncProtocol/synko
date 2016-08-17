
dop.core.node.prototype.register = function( object_id, object_name ) {
    var object_data = dop.data.object[object_id];
    if (typeof object_name == 'string')
        this.object[object_name] = object_data.object;
    this.object_id[object_id] = object_name;
    object_data.nodes += 1;
    object_data.node[this.token] = {};
};