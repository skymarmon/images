class ChooseLocation extends Phaser.Scene {
  constructor() {
    super('ChooseLocation');
  }

  create() {
    this.add.text(50, 50, 'Choose Location Scene', {
      fontSize: '24px',
      color: '#ffffff'
    });
  }
}
