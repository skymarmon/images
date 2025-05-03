class ChooseClass extends Phaser.Scene {
  constructor() {
    super('ChooseClass');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const bg = this.add.image(width / 2, height / 2, 'choose_class_bg')
      .setOrigin(0.5);
    bg.setScale(width / bg.width, height / bg.height);

    let wizard = this.add.image(width / 2, height / 2, 'choose_class_wizard')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    wizard.on('pointerdown', () => {
      wizard.setTexture('choose_class_wizard_selected');
    });

    const backButton = this.add.image(width - 50, 50, 'choose_class_back')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => {
      this.scene.start('StartScene');
    });

    const selectButton = this.add.image(width / 2, height * 0.85, 'choose_class_selected')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    selectButton.on('pointerdown', () => {
      this.scene.start('ChooseLocation');
    });
  }
}
