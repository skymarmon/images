export class ChooseClass extends Phaser.Scene {
  constructor() {
    super('ChooseClass');
  }

  preload() {
    // 이미지 로드
    this.load.image('start_bg', 'assets/start_bg.png');
    this.load.image('start_start', 'assets/start_start.png');
    this.load.image('choose_class_wizard', 'assets/choose_class_wizard.png');
    this.load.image('choose_class_astronomer', 'assets/choose_class_astronomer.png');
    this.load.image('choose_class_shadow', 'assets/choose_class_shadow.png');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 배경 추가
    this.add.image(centerX, centerY, 'start_bg');

    // "게임 시작" 버튼
    const startButton = this.add.image(centerX, centerY + 150, 'start_start').setInteractive();
    startButton.on('pointerup', () => {
      // ChooseCharacter 씬으로 넘어감
      this.scene.start('ChooseCharacter');
    });

    // 캐릭터 선택 (기본 캐릭터: wizard)
    this.add.image(centerX - 150, centerY, 'choose_class_wizard');
    const wizardShadow = this.add.image(centerX - 150, centerY + 50, 'choose_class_shadow');
    wizardShadow.setTexture('choose_class_shadow'); // 기본으로 shadow 표시

    this.add.image(centerX + 150, centerY, 'choose_class_astronomer');
    const astronomerShadow = this.add.image(centerX + 150, centerY + 50, 'choose_class_shadow');
    astronomerShadow.setTexture('choose_class_shadow'); // 기본으로 shadow 표시

    // 클릭하면 선택된 캐릭터 그림자 변경
    const wizard = this.add.image(centerX - 150, centerY, 'choose_class_wizard').setInteractive();
    wizard.on('pointerup', () => {
      wizardShadow.setTexture('choose_class_select');
      astronomerShadow.setTexture('choose_class_shadow');
    });

    const astronomer = this.add.image(centerX + 150, centerY, 'choose_class_astronomer').setInteractive();
    astronomer.on('pointerup', () => {
      wizardShadow.setTexture('choose_class_shadow');
      astronomerShadow.setTexture('choose_class_select');
    });
  }
}
