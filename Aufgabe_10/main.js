var L10_Snowboardpiste_No3;
(function (L10_Snowboardpiste_No3) {
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
    let imageData2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        background = new L10_Snowboardpiste_No3.Background();
        house = new L10_Snowboardpiste_No3.House();
        lift = new L10_Snowboardpiste_No3.Lift();
        mountain = new L10_Snowboardpiste_No3.Mountain();
        snowboarder = new L10_Snowboardpiste_No3.Snowboarder(new L10_Snowboardpiste_No3.Vector(0, 250), new L10_Snowboardpiste_No3.Vector(crc2.canvas.width, 0));
        piste = new L10_Snowboardpiste_No3.Piste();
        sun = new L10_Snowboardpiste_No3.Sun();
        tree = new L10_Snowboardpiste_No3.Tree();
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
            let snowflake = new L10_Snowboardpiste_No3.Snow(new L10_Snowboardpiste_No3.Vector(x, y), new L10_Snowboardpiste_No3.Vector(600, 0));
            snowflakes.push(snowflake);
        }
    }
    function createSnowboarder(nSnowboarder) {
        for (let i = 0; i < nSnowboarder; i++) {
            let x = (Math.random() - 0.5) * 700;
            let y = -(Math.random() * 200);
            let snowboarder = new L10_Snowboardpiste_No3.Snowboarder(new L10_Snowboardpiste_No3.Vector(-200, 0), new L10_Snowboardpiste_No3.Vector(x, y));
            mSnowboarder.push(snowboarder);
        }
    }
    function createClouds(nCLouds) {
        for (let i = 0; i < nCLouds; i++) {
            let x = (Math.random() - 0.5) * 250;
            let y = -(Math.random() * 75);
            let cloud = new L10_Snowboardpiste_No3.Cloud(new L10_Snowboardpiste_No3.Vector(400, 220), new L10_Snowboardpiste_No3.Vector(x, y));
            cloudOne.push(cloud);
        }
        for (let i = 0; i < nCLouds; i++) {
            let x = (Math.random() - 0.5) * 250;
            let y = -(Math.random() * 75);
            let cloud = new L10_Snowboardpiste_No3.Cloud(new L10_Snowboardpiste_No3.Vector(800, 125), new L10_Snowboardpiste_No3.Vector(x, y));
            cloudTwo.push(cloud);
        }
    }
    function createCanvas() {
        background.drawBackground(crc2);
        sun.drawSun(crc2, new L10_Snowboardpiste_No3.Vector(100, 75));
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
    }
    function drawObjects() {
        snowboarder.drawLiftPeople(crc2);
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
})(L10_Snowboardpiste_No3 || (L10_Snowboardpiste_No3 = {}));
//# sourceMappingURL=main.js.map