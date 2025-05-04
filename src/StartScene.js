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
    const width = this.scale.width;
    const height = this.scale.height;

    // license.png를 배경 위에 추가하고 처음에는 투명도로 설정
    const license = this.add.image(width / 2, height / 2, 'license').setOrigin(0.5);
    license.setAlpha(0);  // 처음에 보이지 않게 설정

    // license 이미지 페이드인 (2초 동안)
    this.tweens.add({
      targets: license,
      alpha: 1,
      duration: 2000,
      ease: 'Power2',
      onComplete: () => {
        // 페이드인 후 3초 동안 유지하고, 그 후 페이드아웃 시작
        this.tweens.add({
          targets: license,
          alpha: 0,
          duration: 2000,
          ease: 'Power2',
          onComplete: () => {
            // license 이미지가 사라지고 배경 페이드인
            const bg = this.add.image(width / 2, height / 2, 'start_bg').setOrigin(0.5);
            bg.setAlpha(0);  // 배경도 처음에 보이지 않게 설정

            // 배경 페이드인 효과 (2초 동안)
            this.tweens.add({
              targets: bg,
              alpha: 1,
              duration: 2000,
              ease: 'Power2',
            });

            // "게임 시작" 버튼을 추가하고 클릭 시 ChooseClass 씬으로 넘어감
            const startButton = this.add.image(width / 2, height / 2 + 100, 'start_start').setInteractive();
            startButton.on('pointerup', () => {
              // ChooseClass 씬으로 이동 (페이드 인 없이)
              this.scene.start('ChooseClass');
            });
          }
        });
      }
    });
  }

  update() {
    // ChooseClass 씬에서 돌아올 때는 페이드 인 없이 바로 배경을 표시하도록 설정
    if (this.scene.isActive('ChooseClass')) {
      this.cameras.main.fadeIn(0); // 즉시 페이드 인 없이 씬 전환
    }
  }
}
