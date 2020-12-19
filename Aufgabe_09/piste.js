var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
    class Piste {
        drawPiste(_crc2, golden) {
            console.log("Piste");
            _crc2.beginPath();
            _crc2.moveTo(0, 550);
            _crc2.lineTo(_crc2.canvas.width, _crc2.canvas.height * golden + 50);
            _crc2.lineTo(_crc2.canvas.width, _crc2.canvas.height);
            _crc2.lineTo(0, _crc2.canvas.height);
            _crc2.fillStyle = "white";
            _crc2.fill();
            _crc2.beginPath(); //Dreieck
            _crc2.moveTo(_crc2.canvas.width, _crc2.canvas.height * golden + 250);
            _crc2.lineTo(_crc2.canvas.width, _crc2.canvas.height);
            _crc2.lineTo(200, _crc2.canvas.height);
            _crc2.fillStyle = "HSL(60, 50%, 30%";
            _crc2.fill();
        }
    }
    L09_Snowboardpiste_No2.Piste = Piste;
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=piste.js.map