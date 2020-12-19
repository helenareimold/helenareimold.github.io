namespace test {

    class Vector {
        x: number = 0;
        y: number = 0;

        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

        set(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }
    }

    let v1: Vector = new Vector();
    // v1.x=1;
    // v1.y=2;
    v1.set(5, 10);
    v1.scale(2);
    console.log(v1);
    let v2: Vector = new Vector();
    v2.set(2, 5);
    v2.scale(3);
    console.log(v2);
}
