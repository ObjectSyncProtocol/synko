

syncio.osp = function( user, messages ) {


    if (typeof messages[0] != 'object')
        messages = [messages];


    // Managing all messages one by one
    for (var i=0, t=messages.length, request, request_id, action; i<t; i++) {

        request = messages[i];
        request_id = request[0];
        action = request[1];

        // If is a number we manage the OSP request
        if ( typeof request_id == 'number' ) {

            // REQUEST ===============================================================
            if (request_id > 0 && typeof syncio.on[syncio.protocol_keys[action]] == 'function' )
                syncio.on[syncio.protocol_keys[action]].call( this, user, request );


            // RESPONSE ===============================================================
            else {

                request_id *= -1;

                if ( user.requests[ request_id ] !== null && typeof user.requests[ request_id ] == 'object' ) {

                    if ( typeof syncio.on['_' + syncio.protocol_keys[action]] == 'function' )
                        syncio.on['_' + syncio.protocol_keys[action]].call( this, user, request );

                    else
                        syncio.on.reject.call( this, user, request );

                    // Removing request
                    delete user.requests[request_id];

                }

            }

        }

    }

};