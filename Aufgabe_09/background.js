var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
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
    L09_Snowboardpiste_No2.Background = Background;
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=background.js.map