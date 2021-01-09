var L10_Snowboardpiste_No3;
(function (L10_Snowboardpiste_No3) {
    class Snow extends L10_Snowboardpiste_No3.Moveable {
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
    }
    L10_Snowboardpiste_No3.Snow = Snow;
})(L10_Snowboardpiste_No3 || (L10_Snowboardpiste_No3 = {}));
//# sourceMappingURL=snow.js.map