import './style.css';

import "phaser";

const IMG_VEGETABLIA_TILES = "vegetablia-tiles";
const TILEMAP_VEGETABLIA_DEMO = "vegetablia-demo";

export default class RickScene extends Phaser.Scene {
  private _controls: Phaser.Cameras.Controls.FixedKeyControl;

  constructor() {
    super("my-scene");
  }

  preload() {
    this.load.image(IMG_VEGETABLIA_TILES, "assets/vegetablia.png");
    this.load.tilemapTiledJSON(TILEMAP_VEGETABLIA_DEMO, "assets/maps/vegetablia-demo.json");
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////

  create() {
    this.configureCamera();
    this.createInput();
    this.createWorld();
  }

  protected configureCamera() {
    // this.cameras.main.setZoom(2);
  }

  protected createInput() {
    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.25,
    };

    this._controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  }

  protected createWorld() {
    const tilemap = this.make.tilemap({ key: TILEMAP_VEGETABLIA_DEMO, tileWidth: 8, tileHeight: 8 });
    const tileset = tilemap.addTilesetImage("rick2", IMG_VEGETABLIA_TILES);

    tilemap.createLayer("front", tileset).setDepth(10).setScrollFactor(1, 1);
    tilemap.createLayer("ground", tileset).setDepth(8).setScrollFactor(1, 1);
    tilemap.createLayer("bg-near", tileset).setDepth(6).setScrollFactor(1, 1);
    tilemap.createLayer("bg-mid", tileset).setDepth(4).setScrollFactor(0.8, 0.9);
    tilemap.createLayer("bg-far", tileset).setDepth(2).setScrollFactor(0.6, 0.66);
    tilemap.createLayer("sky", tileset).setDepth(0).setScrollFactor(0, 0);

    this.cameras.main.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////

  update(now, delta) {
    this._controls.update(delta);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  width: 640,
  height: 640,
  //   zoom: 2,
  scene: RickScene,
  pixelArt: true,
});
