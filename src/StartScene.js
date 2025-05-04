// src/StartScene.js

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // ... (preload 코드는 동일)
        this.load.image('license', 'assets/license.png');
        this.load.image('start_bg', 'assets/start_bg.png');
        this.load.image('start_start', 'assets/start_start.png');
    }

    init(data) {
        this.skipIntro = data && data.skipIntro === true;
        console.log("StartScene init, skipIntro:", this.skipIntro);
    }

    create() {
        // *** 중요: 현재 실제 화면(캔버스) 크기를 가져옵니다 ***
        const { width, height } = this.scale; // 또는 this.cameras.main
        const centerX = width / 2;
        const centerY = height / 2;
        console.log(`StartScene create: Screen dimensions = ${width}x${height}`);


        if (this.skipIntro) {
            console.log("StartScene: Skipping intro, showing start screen instantly.");
            this.showStartScreen(true);
        } else {
            console.log("StartScene: Showing intro sequence.");
            // 라이선스 이미지 위치도 동적 중앙으로 설정
            const licenseImg = this.add.image(centerX, centerY, 'license').setAlpha(0);

            // 라이선스 이미지 크기 조절 (선택 사항): 화면 크기에 비해 너무 크거나 작지 않도록
            // 예: 화면 너비의 80%를 넘지 않도록 스케일 조절
            const scaleFactor = Math.min(width * 0.8 / licenseImg.width, height * 0.8 / licenseImg.height, 1);
            licenseImg.setScale(scaleFactor);


            this.tweens.add({
                targets: licenseImg,
                alpha: 1,
                duration: 1500,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.time.delayedCall(3000, () => {
                        this.tweens.add({
                            targets: licenseImg,
                            alpha: 0,
                            duration: 1500,
                            ease: 'Sine.easeInOut',
                            onComplete: () => {
                                licenseImg.destroy();
                                this.showStartScreen(false);
                            }
                        });
                    }, [], this);
                }
            });
        }

        // 화면 크기가 변경될 때 레이아웃을 업데이트하기 위한 리스너 (필요한 경우)
        // this.scale.on('resize', this.handleResize, this);
    }

    showStartScreen(instant = false) {
        // *** 중요: 현재 실제 화면(캔버스) 크기를 가져옵니다 ***
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;
        console.log(`StartScene showStartScreen: Screen dimensions = ${width}x${height}`);


        // 배경 이미지: 화면을 꽉 채우도록 스케일 조절
        const startBg = this.add.image(centerX, centerY, 'start_bg')
                           .setAlpha(instant ? 1 : 0);
        // 배경 이미지 스케일 조절 (화면 비율과 이미지 비율이 다를 경우 필요)
        startBg.setDisplaySize(width, height); // 화면 크기에 정확히 맞춤 (비율 깨질 수 있음)
        // 또는 비율 유지하며 덮기:
        // const bgScale = Math.max(width / startBg.width, height / startBg.height);
        // startBg.setScale(bgScale).setPosition(centerX, centerY);

        // 시작 버튼 위치: 동적 화면 크기 기준 중앙 하단
        const startButton = this.add.image(centerX, height * 0.85, 'start_start')
                               .setAlpha(instant ? 1 : 0)
                               .setInteractive({ useHandCursor: true });

        // 시작 버튼 크기 조절 (선택 사항): 화면 높이의 일정 비율 등으로 조절
        const buttonScale = height / 10 / startButton.height; // 예: 화면 높이의 1/10 크기
        startButton.setScale(Math.min(buttonScale, 1)); // 너무 커지지 않도록 최대 1배


        startButton.on('pointerdown', () => {
            console.log('Start button clicked! Starting ChooseClass scene...');
            this.scene.start('ChooseClass');
        });

        if (!instant) {
            console.log("StartScene: Fading in start screen elements.");
            this.tweens.add({
                targets: [startBg, startButton], // 배경은 이미 보이므로 버튼만 페이드인 할 수도 있음
                alpha: 1,
                duration: 1000,
                ease: 'Sine.easeInOut'
            });
        } else {
             console.log("StartScene: Start screen elements displayed instantly.");
             // instant=true 일 때, alpha가 이미 1이므로 트윈 불필요
        }
    }

    // 화면 크기 변경 시 호출될 함수 (필요한 경우 정의)
    // handleResize(gameSize) {
    //     const { width, height } = gameSize;
    //     const centerX = width / 2;
    //     const centerY = height / 2;
    //     console.log(`StartScene handleResize: New dimensions = ${width}x${height}`);
    //     // 여기서 기존에 생성된 요소들의 위치나 크기를 업데이트합니다.
    //     // 예: this.startButton.setPosition(centerX, height * 0.85);
    //     //      this.startBg.setDisplaySize(width, height);
    //     // ...
    // }

    // update(time, delta) { }
}
