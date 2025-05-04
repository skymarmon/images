// src/ChooseClass.js

class ChooseClass extends Phaser.Scene {
    constructor() {
        super({ key: 'ChooseClass' });
        this.selectedClass = null;
        this.wizardImage = null;
        this.astroImage = null;
        this.confirmButton = null;
        this.backButton = null; // 뒤로가기 버튼 참조 추가
    }

    preload() {
        // ... (preload 코드는 동일)
        console.log("ChooseClass: Preloading assets...");
        this.load.image('class_bg', 'assets/choose_class.png');
        this.load.image('wizard_idle', 'assets/choose_class_wizard.png');
        // ... (나머지 이미지 로드) ...
        this.load.image('back_button', 'assets/choose_class_back.png');
    }

    create() {
        // *** 중요: 현재 실제 화면(캔버스) 크기를 가져옵니다 ***
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;
        console.log(`ChooseClass create: Screen dimensions = ${width}x${height}`);

        // 1. 배경 설정
        const classBg = this.add.image(centerX, centerY, 'class_bg');
        // 배경 이미지 스케일 조절 (화면 비율과 이미지 비율이 다를 경우 필요)
        classBg.setDisplaySize(width, height); // 화면 크기에 정확히 맞춤 (비율 깨질 수 있음)
        // 또는 비율 유지하며 덮기:
        // const bgScale = Math.max(width / classBg.width, height / classBg.height);
        // classBg.setScale(bgScale).setPosition(centerX, centerY);


        // 2. 클래스 선택 이미지 배치 (화면 너비에 따라 간격 조절)
        const classY = centerY * 0.8; // Y 위치 (화면 중앙보다 약간 위)
        const classSpacing = width * 0.3; // 두 이미지 사이 간격 (화면 너비의 30%)
        const classScale = Math.min(width * 0.25 / 150, height * 0.3 / 200, 1); // 이미지 크기 조절 (가로 25%, 세로 30% 이내, 원본 크기 150x200 가정)

        this.wizardImage = this.add.image(centerX - classSpacing / 2, classY, 'wizard_idle')
            .setScale(classScale) // 크기 조절 적용
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.selectClass('wizard'));

        this.astroImage = this.add.image(centerX + classSpacing / 2, classY, 'astro_idle')
            .setScale(classScale) // 크기 조절 적용
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.selectClass('astronomer'));

        // 3. 선택 완료 버튼 (동적 화면 크기 기준 중앙 하단)
        this.confirmButton = this.add.image(centerX, height * 0.85, 'confirm_button')
            .setInteractive({ useHandCursor: true });
        // 버튼 크기 조절 (선택 사항)
        const confirmBtnScale = height / 12 / this.confirmButton.height; // 화면 높이의 1/12 크기
        this.confirmButton.setScale(Math.min(confirmBtnScale, 1));
        this.confirmButton.on('pointerdown', () => this.confirmSelection());


        // 4. 뒤로가기 버튼 (동적 화면 크기 기준 우측 상단)
        const padding = Math.min(width, height) * 0.05; // 화면 크기에 따른 동적 패딩
        this.backButton = this.add.image(width - padding, padding, 'back_button')
            .setOrigin(1, 0) // 기준점 우측 상단
            .setInteractive({ useHandCursor: true });
        // 버튼 크기 조절 (선택 사항)
        const backBtnScale = padding / this.backButton.height * 1.5; // 패딩 크기에 비례하게
        this.backButton.setScale(Math.min(backBtnScale, 1));
        this.backButton.on('pointerdown', () => {
            console.log("Back button clicked! Returning to StartScene (skipping intro)...");
            this.scene.start('StartScene', { skipIntro: true });
        });

        // 화면 크기가 변경될 때 레이아웃을 업데이트하기 위한 리스너 (필요한 경우)
        // this.scale.on('resize', this.handleResize, this);
    }

    // selectClass, confirmSelection 함수는 로직 변경 없음

    // 화면 크기 변경 시 호출될 함수 (필요한 경우 정의)
    // handleResize(gameSize) {
    //     const { width, height } = gameSize;
    //     const centerX = width / 2;
    //     const centerY = height / 2;
    //     const padding = Math.min(width, height) * 0.05;
    //     const classSpacing = width * 0.3;
    //     const classY = centerY * 0.8;
    //     console.log(`ChooseClass handleResize: New dimensions = ${width}x${height}`);

    //     // 생성된 요소들의 위치와 크기 업데이트
    //     // this.classBg.setDisplaySize(width, height);
    //     // this.wizardImage.setPosition(centerX - classSpacing / 2, classY);
    //     // this.astroImage.setPosition(centerX + classSpacing / 2, classY);
    //     // this.confirmButton.setPosition(centerX, height * 0.85);
    //     // this.backButton.setPosition(width - padding, padding);
    //     // 필요하다면 Scale도 업데이트:
    //     // const classScale = ...; this.wizardImage.setScale(classScale); ...
    // }

    // update(time, delta) { }
}
