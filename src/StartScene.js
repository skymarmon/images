let firstLaunch = true;

class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    this.load.image('start_bg', 'assets/start_bg.png');
    this.load.image('start_button', 'assets/start_start.png');
    this.load.image('license', 'assets/license.png');
    this.load.image('choose_class_bg', 'assets/choose_class_bg.png');
    this.load.image('choose_class_wizard', 'assets/choose_class_wizard.png');
    this.load.image('choose_class_wizard_selected', 'assets/choose_class_wizard_selected.png');
    this.load.image('choose_class_back', 'assets/choose_class_back.png');
    this.load.image('choose_class_selected', 'assets/choose_class_selected.png');
    this.load.image('choose_class_astronomer', 'assets/choose_class_astronomer.png');
    this.load.image('choose_class_astronomer_selected', 'assets/choose_class_astronomer_selected.png');
  }

  create() {
    if (firstLaunch) {
      firstLaunch = false;
      this.showLicenseThenStart();
    } else {
      this.showGameStartScreen(false);
    }
  }

  showLicenseThenStart() {
    const width = this.scale.width;
    const height = this.scale.height;

    const licenseImage = this.add.image(width / 2, height / 2, 'license')
      .setOrigin(0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: licenseImage,
      alpha: 1,
      duration: 1000,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.tweens.add({
            targets: licenseImage,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
              licenseImage.destroy();
              this.showGameStartScreen(true);
            }
          });
        });
      }
    });
  }

  showGameStartScreen(applyFadeIn) {
    const width = this.scale.width;
    const height = this.scale.height;

    const startBg = this.add.image(width / 2, height / 2, 'start_bg')
      .setOrigin(0.5);
    startBg.setScale(width / startBg.width, height / startBg.height);

    const startButton = this.add.image(width / 2, height * 0.75, 'start_button')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    if (applyFadeIn) {
      startBg.setAlpha(0);
      startButton.setAlpha(0);

      this.tweens.add({
        targets: [startBg, startButton],
        alpha: 1,
        duration: 1000
      });
    }

    startButton.on('pointerdown', () => {
      this.scene.start('ChooseClass');
    });
  }
}

window.StartScene = StartScene;
