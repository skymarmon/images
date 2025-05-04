export class ChooseClass extends Phaser.Scene {
  constructor() {
    super('ChooseClass');
  }

  preload() {
    this.load.image('choose_class_bg', 'assets/choose_class_bg.png');
    this.load.image('choose_class_wizard', 'assets/choose_class_wizard.png');
    this.load.image('choose_class_wizard_selected', 'assets/choose_class_wizard_selected.png');
    this.load.image('choose_class_astronomer', 'assets/choose_class_astronomer.png');
    this.load.image('choose_class_astronomer_selected', 'assets/choose_class_astronomer_selected.png');
    this.load.image('choose_class_back', 'assets/choose_class_back.png');
    this.load.image('choose_class_selected', 'assets/choose_class_selected.png');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 배경
    this.add.image(centerX, centerY, 'choose_class_bg').setOrigin(0.5);

    // 클래스 선택 상태
    this.selectedClass = null;

    // 위자드 이미지
    this.wizard = this.add.image(centerX - 150, centerY, 'choose_class_wizard').setOrigin(0.5).setInteractive();
    this.wizard.on('pointerup', () => {
      this.selectClass('wizard');
    });

    // 천문학자 이미지
    this.astronomer = this.add.image(centerX + 150, centerY, 'choose_class_astronomer').setOrigin(0.5).setInteractive();
    this.astronomer.on('pointerup', () => {
      this.selectClass('astronomer');
    });

    // 뒤로가기 버튼 (우상단)
    this.backButton = this.add.image(this.cameras.main.width - 50, 50, 'choose_class_back')
      .setOrigin(0.5).setInteractive();
    this.backButton.on('pointerup', () => {
      this.scene.start('StartScene'); // 라이선스 없이 바로 StartScene
    });

    // 선택 완료 버튼 (중앙 하단)
    this.confirmButton = this.add.image(centerX, this.cameras.main.height - 80, 'choose_class_selected')
      .setOrigin(0.5).setInteractive();
    this.confirmButton.on('pointerup', () => {
      if (this.selectedClass) {
        window.selectedClass = this.selectedClass; // 전역 변수로 저장
        this.scene.start('ChooseLocation');
      }
    });
  }

  selectClass(className) {
    this.selectedClass = className;

    // 이미지 교체
    if (className === 'wizard') {
      this.wizard.setTexture('choose_class_wizard_selected');
      this.astronomer.setTexture('choose_class_astronomer');
    } else if (className === 'astronomer') {
      this.wizard.setTexture('choose_class_wizard');
      this.astronomer.setTexture('choose_class_astronomer_selected');
    }
  }
}
