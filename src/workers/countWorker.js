self.onmessage = function (data) {
    var type = data?.data?.type;
    if (type && this[type] && typeof this[type] == 'function') {
        var result = this[type]();
        postMessage(result);
    } else {
        console.log('Could not find your method type on the worker.');
        this.terminate();
    }
};

self.countToOneHundredThousand = function () {
    for (var i = 0; i <= 100000; i++) {
        console.log(i);
    }
    return 'i can count to 100000';
};

self.countToTen = function () {
    for (var i = 0; i <= 10; i++) {
        console.log(i);
    }
    return 'i can count to 10';
};

self.countToOneHundred = function () {
    for (var i = 0; i <= 100; i++) {
        console.log(i);
    }
    return 'i can count to 100';
};
