// src/StartScene.js 수정

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('license', 'assets/license.png');
        this.load.image('start_bg', 'assets/start_bg.png');
        this.load.image('start_start', 'assets/start_start.png');
    }

    // init: Scene이 시작될 때 다른 Scene으로부터 데이터를 받을 수 있습니다.
    init(data) {
        // ChooseClass Scene에서 { skipIntro: true } 데이터를 받았는지 확인합니다.
        this.skipIntro = data && data.skipIntro === true;
        console.log("StartScene init, skipIntro:", this.skipIntro);
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // skipIntro 플래그를 확인하여 분기합니다.
        if (this.skipIntro) {
            // 인트로 건너뛰기: 바로 시작 화면 표시 (페이드 효과 없음)
            console.log("StartScene: Skipping intro, showing start screen instantly.");
            this.showStartScreen(true); // true는 즉시 표시하라는 의미
        } else {
            // 일반 시작: 라이선스 표시 및 페이드 효과 적용
            console.log("StartScene: Showing intro sequence.");
            const licenseImg = this.add.image(centerX, centerY, 'license').setAlpha(0);

            this.tweens.add({
                targets: licenseImg,
                alpha: 1,
                duration: 1500, // 페이드인 시간 (1.5초)
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    // 3초 대기
                    this.time.delayedCall(3000, () => {
                        // 페이드 아웃
                        this.tweens.add({
                            targets: licenseImg,
                            alpha: 0,
                            duration: 1500, // 페이드아웃 시간 (1.5초)
                            ease: 'Sine.easeInOut',
                            onComplete: () => {
                                licenseImg.destroy(); // 라이선스 이미지 제거 (메모리 관리)
                                this.showStartScreen(false); // 시작 화면 페이드인 표시
                            }
                        });
                    }, [], this);
                }
            });
        }
    }

    // 시작 화면 표시 함수 (instant: 즉시 표시 여부)
    showStartScreen(instant = false) {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // 배경 이미지 추가 (instant 여부에 따라 alpha 초기값 설정)
        const startBg = this.add.image(centerX, centerY, 'start_bg')
                           .setAlpha(instant ? 1 : 0);

        // 시작 버튼 이미지 추가 (instant 여부에 따라 alpha 초기값 설정)
        const startButton = this.add.image(centerX, height * 0.85, 'start_start') // 중앙 하단
                               .setAlpha(instant ? 1 : 0)
                               .setInteractive({ useHandCursor: true }); // 클릭/터치 가능하게 설정, 마우스 오버시 커서 변경

        // 시작 버튼 클릭/터치 이벤트 리스너
        startButton.on('pointerdown', () => {
            console.log('Start button clicked! Starting ChooseClass scene...');
            // 효과음 추가 가능: this.sound.play('clickSound');
            this.scene.start('ChooseClass'); // ChooseClass Scene으로 전환
        });

        // instant가 false일 경우 (즉, 페이드인이 필요할 경우)
        if (!instant) {
            console.log("StartScene: Fading in start screen elements.");
            this.tweens.add({
                targets: [startBg, startButton],
                alpha: 1,
                duration: 1000, // 페이드인 시간 (1초)
                ease: 'Sine.easeInOut'
            });
        } else {
             console.log("StartScene: Start screen elements displayed instantly.");
        }
    }

    // update(time, delta) { }
}
