export class ChooseLocation extends Phaser.Scene {
  constructor() {
    super('ChooseLocation');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2, `선택된 클래스: ${window.selectedClass}`, {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
