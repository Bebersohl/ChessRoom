$(function () {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function (name, message) {
        // Add the message to the page.
        $('#discussion').append('<li><strong>' + htmlEncode(name)
            + '</strong> ' + '<span class="text-muted">[' + new Date().toUTCString().substring(17, 25) + ']:</span> ' + htmlEncode(message) + '</li>');
    };

    // Set initial focus to message input box.
    $('#message').focus();
    //keybind to enter
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#sendmessage").click();
            return event.keyCode != 13;
        }
    });
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {

            if ($('#message').val() !== '') {
                console.log('message sent');
                // Call the Send method on the hub.
                chat.server.send('@User.Identity.GetUserName()', $('#message').val());
                // Clear text box and reset focus for next comment.
                $('#message').val('').focus();
                $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight }, 'fast');
                return false;
            }
        });
    });
    // This optional function html-encodes messages for display in the page.
    function htmlEncode(value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    }

});

