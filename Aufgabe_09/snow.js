var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
    class Snow {
        constructor(_size, _position) {
            console.log("Snow constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Snowboardpiste_No2.Vector(0, 0);
            this.size = _size;
            this.particle = new Path2D();
        }
        drawSnow(_crc2) {
            _crc2.save();
            console.log("Snow", this.position, this.size);
            let radiusParticle = Math.random() * 5;
            this.particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            _crc2.translate(this.position.x, this.position.y);
            _crc2.fillStyle = "white";
            let x = this.size.x;
            let y = -this.size.y;
            _crc2.translate(x, y);
            _crc2.fill(this.particle);
            _crc2.restore();
        }
        move(_crc2) {
            this.size.y -= 2;
            if (this.size.y < -_crc2.canvas.height)
                this.size.y = 0;
        }
    }
    L09_Snowboardpiste_No2.Snow = Snow;
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=snow.js.map