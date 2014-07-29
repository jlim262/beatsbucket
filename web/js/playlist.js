
var playlist = new function() {
    q = [];

    init = function() {
        q = [];
    }
    push = function(song) {
        q.push(song);
    };

    pop = function() {
        return q.pop();
    }

}