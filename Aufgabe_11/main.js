var L11_Snowboardpiste_No4;
(function (L11_Snowboardpiste_No4) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let snowflakes = [];
    let mSnowboarder = [];
    let cloudOne = [];
    let cloudTwo = [];
    let background;
    let house;
    let lift;
    let mountain;
    let snowboarder;
    let piste;
    let sun;
    let tree;
    let golden;
    let imageData;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        background = new L11_Snowboardpiste_No4.Background();
        house = new L11_Snowboardpiste_No4.House();
        lift = new L11_Snowboardpiste_No4.Lift(new L11_Snowboardpiste_No4.Vector(200, -44), new L11_Snowboardpiste_No4.Vector(-500, 150), "lift");
        mountain = new L11_Snowboardpiste_No4.Mountain();
        snowboarder = new L11_Snowboardpiste_No4.Snowboarder(new L11_Snowboardpiste_No4.Vector(0, 250), new L11_Snowboardpiste_No4.Vector(crc2.canvas.width, 0), "snowboarder");
        piste = new L11_Snowboardpiste_No4.Piste();
        sun = new L11_Snowboardpiste_No4.Sun();
        tree = new L11_Snowboardpiste_No4.Tree();
        golden = 0.62;
        createCanvas();
        imageData = crc2.getImageData(0, 0, canvas.width, canvas.height);
        createClouds(20);
        createSnowboarder(10);
        createSnowflakes(800);
        window.setInterval(update, 100);
    }
    function createSnowflakes(nFlakes) {
        for (let i = 0; i < nFlakes; i++) {
            let x = (Math.random() - 0.5) * crc2.canvas.width;
            let y = -(Math.random() * crc2.canvas.height);
            let snowflake = new L11_Snowboardpiste_No4.Snow(new L11_Snowboardpiste_No4.Vector(x, y), new L11_Snowboardpiste_No4.Vector(600, 0), "snow");
            snowflakes.push(snowflake);
        }
    }
    function createSnowboarder(nSnowboarder) {
        for (let i = 0; i < nSnowboarder; i++) {
            let x = (Math.random() - 0.5) * 700;
            let y = -(Math.random() * 200);
            let snowboarder = new L11_Snowboardpiste_No4.Snowboarder(new L11_Snowboardpiste_No4.Vector(-200, 0), new L11_Snowboardpiste_No4.Vector(x, y), "snowboarder");
            mSnowboarder.push(snowboarder);
        }
    }
    function createClouds(nCLouds) {
        for (let i = 0; i < nCLouds; i++) {
            let x = (Math.random() - 0.5) * 250;
            let y = -(Math.random() * 75);
            let cloud = new L11_Snowboardpiste_No4.Cloud(new L11_Snowboardpiste_No4.Vector(400, 220), new L11_Snowboardpiste_No4.Vector(x, y));
            cloudOne.push(cloud);
            cloudTwo.push(cloud);
        }
    }
    function createCanvas() {
        background.drawBackground(crc2);
        sun.drawSun(crc2, new L11_Snowboardpiste_No4.Vector(100, 75));
        mountain.drawMountain(crc2);
        piste.drawPiste(crc2, golden);
    }
    function update() {
        crc2.putImageData(imageData, 0, 0);
        moveObjects();
        drawObjects();
    }
    function moveObjects() {
        for (let snow of snowflakes) {
            snow.move(crc2);
        }
        for (let boarder of mSnowboarder) {
            boarder.move(crc2);
        }
        lift.move(crc2);
    }
    function drawObjects() {
        //   snowboarder.drawLiftPeople(crc2);
        for (let cloud of cloudOne) {
            cloud.drawCloud(crc2);
        }
        for (let cloud of cloudTwo) {
            cloud.drawCloud(crc2);
        }
        for (let boarder of mSnowboarder) {
            boarder.generateSnowPeople(crc2);
        }
        for (let snow of snowflakes) {
            snow.drawSnow(crc2);
        }
        lift.drawLift(crc2);
        tree.drawTrees(crc2);
        house.drawHouse(crc2);
    }
})(L11_Snowboardpiste_No4 || (L11_Snowboardpiste_No4 = {}));
//# sourceMappingURL=main.js.map