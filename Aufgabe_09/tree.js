var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
    class Tree {
        drawTrees(_crc2) {
            _crc2.beginPath();
            _crc2.rect(1045, 820, 20, 90); //Stamm (1)
            _crc2.fillStyle = "#8A4B08";
            _crc2.fill();
            _crc2.closePath();
            _crc2.beginPath(); //Baum (1)
            _crc2.moveTo(1045, 540);
            _crc2.lineTo(970, 820);
            _crc2.lineTo(1120, 820);
            _crc2.fillStyle = "HSL(75, 70%, 30%";
            _crc2.fill();
            _crc2.closePath();
            _crc2.beginPath();
            _crc2.rect(1135, 800, 30, 140); //Stamm (2)
            _crc2.fillStyle = "#8A4B08";
            _crc2.fill();
            _crc2.closePath();
            _crc2.beginPath(); //Baum (2)
            _crc2.moveTo(1150, 480);
            _crc2.lineTo(1015, 800);
            _crc2.lineTo(1260, 800);
            _crc2.fillStyle = "HSL(20, 70%, 30%";
            _crc2.fill();
            _crc2.closePath();
        }
    }
    L09_Snowboardpiste_No2.Tree = Tree;
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=tree.js.map