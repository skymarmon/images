export class ChooseCharacter extends Phaser.Scene {
  constructor() {
    super('ChooseCharacter');
  }

  preload() {
    // 이미지 파일 로드
    this.load.image('choose_character_bg', 'assets/choose_character_bg.png');
    this.load.image('choose_character_info_bg', 'assets/choose_character_info_bg.png');
    this.load.image('choose_character_wizard', 'assets/choose_character_wizard.png');
    this.load.image('choose_character_astronomer', 'assets/choose_character_astronomer.png');
    this.load.image('choose_character_shadow', 'assets/choose_character_shadow.png');
    this.load.image('choose_character_select', 'assets/choose_character_selected.png');
    this.load.image('choose_character_chosen', 'assets/choose_character_chosen.png');
    this.load.image('choose_character_selectbutton_select', 'assets/choose_character_selectbutton_select.png');
    this.load.image('choose_character_selectbutton_selected', 'assets/choose_character_selectbutton_selected.png');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 배경
    this.add.image(centerX, centerY, 'choose_character_bg');

    // 정보 박스
    const infoBox = this.add.image(centerX + 250, centerY, 'choose_character_info_bg');

    // 캐릭터와 그림자 배치 (왼쪽에 캐릭터들, 오른쪽에 정보 박스)
    const wizard = this.add.image(centerX - 150, centerY, 'choose_character_wizard').setInteractive();
    const astronomer = this.add.image(centerX - 50, centerY, 'choose_character_astronomer').setInteractive();

    // 각 캐릭터에 그림자 이미지 추가
    const wizardShadow = this.add.image(centerX - 150, centerY + 50, 'choose_character_shadow');
    const astronomerShadow = this.add.image(centerX - 50, centerY + 50, 'choose_character_shadow');

    // 캐릭터 클릭 시 그림자 바꾸기
    wizard.on('pointerup', () => {
      wizardShadow.setTexture('choose_character_select');
    });
    astronomer.on('pointerup', () => {
      astronomerShadow.setTexture('choose_character_select');
    });

    // 선택 버튼 추가
    const selectButton = this.add.image(centerX + 250, centerY + 200, 'choose_character_selectbutton_select').setInteractive();

    // 선택 버튼 클릭 시 선택 이미지로 변경
    selectButton.on('pointerup', () => {
      selectButton.setTexture('choose_character_selectbutton_selected');
      // 선택된 캐릭터의 그림자를 'choose_character_chosen'으로 변경
      if (wizardShadow.texture.key === 'choose_character_select') {
        wizardShadow.setTexture('choose_character_chosen');
      } else if (astronomerShadow.texture.key === 'choose_character_select') {
        astronomerShadow.setTexture('choose_character_chosen');
      }
    });
  }
}
