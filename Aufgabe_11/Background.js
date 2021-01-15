var L11_Snowboardpiste_No4;
(function (L11_Snowboardpiste_No4) {
    class Background {
        drawBackground(_crc2) {
            console.log("Background");
            let gradient = _crc2.createLinearGradient(0, 0, 0, _crc2.canvas.height);
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(.2, "lightblue");
            gradient.addColorStop(.4, "white");
            gradient.addColorStop(1, "white");
            _crc2.fillStyle = gradient;
            _crc2.fillRect(0, 0, _crc2.canvas.width, _crc2.canvas.height);
        }
    }
    L11_Snowboardpiste_No4.Background = Background;
})(L11_Snowboardpiste_No4 || (L11_Snowboardpiste_No4 = {}));
//# sourceMappingURL=Background.js.map