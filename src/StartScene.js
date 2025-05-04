export class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    this.load.image('license', 'assets/license.png');
    this.load.image('start_bg', 'assets/start_bg.png');
    this.load.image('start_start', 'assets/start_start.png');

    this.load.image('choose_class_bg', 'assets/choose_class_bg.png');
    this.load.image('choose_class_back', 'assets/choose_class_back.png');
    this.load.image('choose_class_wizard', 'assets/choose_class_wizard.png');
    this.load.image('choose_class_wizard_selected', 'assets/choose_class_wizard_selected.png');
    this.load.image('choose_class_astronomer', 'assets/choose_class_astronomer.png');
    this.load.image('choose_class_astronomer_selected', 'assets/choose_class_astronomer_selected.png');
    this.load.image('choose_class_selected', 'assets/choose_class_selected.png');
  }

  create() {
    const { width, height } = this.scale;

    if (!this.fromChooseClass) {
      const license = this.add.image(width / 2, height / 2, 'license').setAlpha(0).setOrigin(0.5);
      license.setScale(width / license.width, height / license.height);

      this.tweens.add({
        targets: license,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
          this.time.delayedCall(3000, () => {
            this.tweens.add({
              targets: license,
              alpha: 0,
              duration: 1000,
              onComplete: () => {
                license.destroy();
                this.showGameStartScreen();
              }
            });
          });
        }
      });
    } else {
      this.showGameStartScreen();
    }
  }

  showGameStartScreen() {
    const { width, height } = this.scale;

    const bg = this.add.image(width / 2, height / 2, 'start_bg').setOrigin(0.5);
    bg.setScale(width / bg.width, height / bg.height);

    const startButton = this.add.image(width / 2, height / 2 + 100, 'start_start')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    startButton.on('pointerdown', () => {
      this.scene.start('ChooseClass');
    });
  }
}
