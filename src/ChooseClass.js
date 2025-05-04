export class ChooseClass extends Phaser.Scene {
  constructor() {
    super('ChooseClass');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const bg = this.add.image(width / 2, height / 2, 'choose_class_bg')
      .setOrigin(0.5);
    bg.setScale(width / bg.width, height / bg.height);

    // 기본 이미지 키
    let wizardImageKey = 'choose_class_wizard';
    let astronomerImageKey = 'choose_class_astronomer';

    const wizard = this.add.image(width / 2 - 150, height / 2, wizardImageKey)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    const astronomer = this.add.image(width / 2 + 150, height / 2, astronomerImageKey)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // 선택 상태 저장
    let selectedCharacter = null;

    wizard.on('pointerdown', () => {
      wizard.setTexture('choose_class_wizard_selected');
      astronomer.setTexture('choose_class_astronomer');
      selectedCharacter = 'wizard';
      window.selectedClass = 'wizard'; // ✅ 전역 변수 저장
    });

    astronomer.on('pointerdown', () => {
      astronomer.setTexture('choose_class_astronomer_selected');
      wizard.setTexture('choose_class_wizard');
      selectedCharacter = 'astronomer';
      window.selectedClass = 'astronomer'; // ✅ 전역 변수 저장
    });

    // 뒤로가기 버튼
    const backButton = this.add.image(width - 50, 50, 'choose_class_back')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => {
      const startScene = this.scene.get('StartScene');
      if (startScene) startScene.fromChooseClass = true;
      this.scene.start('StartScene');
    });

    // 선택 완료 버튼
    const selectButton = this.add.image(width / 2, height * 0.85, 'choose_class_selected')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    selectButton.on('pointerdown', () => {
      if (selectedCharacter) {
        this.scene.start('ChooseLocation');
      } else {
        this.cameras.main.shake(200, 0.01);
      }
    });
  }
}

window.ChooseClass = ChooseClass;
