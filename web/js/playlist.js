
var playlist = function() {
    var q = new Array();

    this.init = function() {
        q = [];
    }

    this.push = function(song) {
        q.push(song);
    };

    this.pop = function() {
        return q.pop();
    }

}