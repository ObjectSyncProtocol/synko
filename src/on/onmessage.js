

dop.on.message = function( listener, socket, message_raw ) {

    var token_id = socket[dop.key_user_token];
    var node = dop.node[ token_id ];


    // Parsing message
    var message;
    if ( typeof message_raw == 'string' ) {
        // console.log(listener.options)
        try { message = dop.core.parse(node, message_raw ); } 
        catch(e) {}
    }
    else 
        message = message_raw;
// console.log(message)




    // var messages, 
    //     user = (typeof socket[dop.key_user_token] == 'undefined' ) ?
    //         socket
    //     :
    //         this.users[ socket[dop.key_user_token] ];






    // // Managing OSP protocol
    // if ( dop.util.typeof( messages ) == 'array' )
    //     dop.core.manage.call( this, user, messages );

};