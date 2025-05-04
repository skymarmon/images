export class ChooseClass extends Phaser.Scene {
  constructor() {
    super('ChooseClass');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const bg = this.add.image(width / 2, height / 2, 'choose_class_bg')
      .setOrigin(0.5)
      .setScale(width / 800, height / 600); // 크기 조절

    let selectedCharacter = null;

    const wizard = this.add.image(width / 2 - 150, height / 2, 'choose_class_wizard')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    const astronomer = this.add.image(width / 2 + 150, height / 2, 'choose_class_astronomer')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    wizard.on('pointerdown', () => {
      wizard.setTexture('choose_class_wizard_selected');
      astronomer.setTexture('choose_class_astronomer');
      selectedCharacter = 'wizard';
      window.selectedClass = 'wizard';
    });

    astronomer.on('pointerdown', () => {
      astronomer.setTexture('choose_class_astronomer_selected');
      wizard.setTexture('choose_class_wizard');
      selectedCharacter = 'astronomer';
      window.selectedClass = 'astronomer';
    });

    const backButton = this.add.image(width - 50, 50, 'choose_class_back')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => {
      const startScene = this.scene.get('StartScene');
      if (startScene) startScene.fromChooseClass = true;
      this.scene.start('StartScene');
    });

    const selectButton = this.add.image(width / 2, height * 0.85, 'choose_class_selected')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    selectButton.on('pointerdown', () => {
      if (selectedCharacter) {
        this.scene.start('ChooseCharacter');
      } else {
        this.cameras.main.shake(200, 0.01);
      }
    });
  }
}
