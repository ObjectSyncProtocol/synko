

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
            if (request_id > 0) {

                switch( action ) {

                    case syncio.protocol.connect:
                        syncio.on.connect.call( this, user, request );
                        break;

                    case syncio.protocol.request:
                        syncio.on.request.call( this, user, request );
                        break;

                    case syncio.protocol.sync:
                        syncio.on.sync.call( this, user, request );
                        break;

                }

            }

            // RESPONSE ===============================================================
            else {

                request_id *= -1;

                if ( user.requests[ request_id ] !== null && typeof user.requests[ request_id ] == 'object' ) {

                    switch( action ) {

                        case syncio.protocol.connect:
                            syncio.on._connect.call( this, user, request );
                            break;

                        case syncio.protocol.request:
                            syncio.on._request.call( this, user, request, request_id, action );
                            break;

                        case syncio.protocol.sync:
                            syncio.on._sync.call( this, user, request );
                            break;

                        default:
                            syncio.on.reject.call( this, user, request, request_id, action );

                    }

                    // Removing request
                    delete user.requests[request_id];

                }

            }

        }

    }

};