var test;
(function (test) {
    class Vector {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
    }
    let v1 = new Vector();
    // v1.x=1;
    // v1.y=2;
    v1.set(5, 10);
    v1.scale(2);
    console.log(v1);
    let v2 = new Vector();
    v2.set(2, 5);
    v2.scale(3);
    console.log(v2);
})(test || (test = {}));
//# sourceMappingURL=test.js.map