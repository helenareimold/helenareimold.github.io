var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let snowflakes = [];
    let mSnowboarder = [];
    let cloudOne = [];
    let cloudTwo = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        createClouds(20);
        createSnowboarder(10);
        createSnowflakes(800);
        window.setInterval(update, 20);
    }
    function createSnowflakes(nFlakes) {
        for (let i = 0; i < nFlakes; i++) {
            let x = (Math.random() - 0.5) * crc2.canvas.width;
            let y = -(Math.random() * crc2.canvas.height);
            let snowflake = new L09_Snowboardpiste_No2.Snow(new L09_Snowboardpiste_No2.Vector(x, y), new L09_Snowboardpiste_No2.Vector(600, 0));
            snowflakes.push(snowflake);
        }
    }
    function createSnowboarder(nSnowboarder) {
        for (let i = 0; i < nSnowboarder; i++) {
            let x = (Math.random() - 0.5) * 700;
            let y = -(Math.random() * 200);
            let snowboarder = new L09_Snowboardpiste_No2.Snowboarder(new L09_Snowboardpiste_No2.Vector(-200, 0), new L09_Snowboardpiste_No2.Vector(x, y));
            mSnowboarder.push(snowboarder);
        }
    }
    function createClouds(nCLouds) {
        for (let i = 0; i < nCLouds; i++) {
            let x = (Math.random() - 0.5) * 250;
            let y = -(Math.random() * 75);
            let cloud = new L09_Snowboardpiste_No2.Cloud(new L09_Snowboardpiste_No2.Vector(400, 220), new L09_Snowboardpiste_No2.Vector(x, y));
            cloudOne.push(cloud);
        }
        for (let i = 0; i < nCLouds; i++) {
            let x = (Math.random() - 0.5) * 250;
            let y = -(Math.random() * 75);
            let cloud = new L09_Snowboardpiste_No2.Cloud(new L09_Snowboardpiste_No2.Vector(800, 125), new L09_Snowboardpiste_No2.Vector(x, y));
            cloudTwo.push(cloud);
        }
    }
    function update() {
        let background = new L09_Snowboardpiste_No2.Background();
        let house = new L09_Snowboardpiste_No2.House();
        let lift = new L09_Snowboardpiste_No2.Lift();
        let mountain = new L09_Snowboardpiste_No2.Mountain();
        let snowboarder = new L09_Snowboardpiste_No2.Snowboarder(new L09_Snowboardpiste_No2.Vector(0, 250), new L09_Snowboardpiste_No2.Vector(crc2.canvas.width, 0));
        let piste = new L09_Snowboardpiste_No2.Piste();
        let sun = new L09_Snowboardpiste_No2.Sun();
        let tree = new L09_Snowboardpiste_No2.Tree();
        let golden = 0.62;
        background.drawBackground(crc2);
        for (let cloud of cloudOne) {
            cloud.drawCloud(crc2);
        }
        for (let cloud of cloudTwo) {
            cloud.drawCloud(crc2);
        }
        sun.drawSun(crc2, new L09_Snowboardpiste_No2.Vector(100, 75));
        mountain.drawMountain(crc2);
        piste.drawPiste(crc2, golden);
        for (let boarder of mSnowboarder) {
            boarder.moveSnowboarder(crc2);
            boarder.generateSnowPeople(crc2);
        }
        snowboarder.drawLiftPeople(crc2);
        lift.drawLift(crc2);
        tree.drawTrees(crc2);
        house.drawHouse(crc2);
        for (let snow of snowflakes) {
            snow.move(crc2);
            snow.drawSnow(crc2);
        }
    }
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=main.js.map