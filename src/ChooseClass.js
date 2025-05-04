// src/ChooseClass.js 파일 생성

class ChooseClass extends Phaser.Scene {
    constructor() {
        super({ key: 'ChooseClass' });
        this.selectedClass = null; // 현재 선택된 클래스 ('wizard', 'astronomer', null)
        this.wizardImage = null;   // 마법사 이미지 객체 참조
        this.astroImage = null;    // 천문학자 이미지 객체 참조
        this.confirmButton = null; // 확인 버튼 객체 참조
    }

    preload() {
        console.log("ChooseClass: Preloading assets...");
        // 필요한 이미지 에셋 로드
        this.load.image('class_bg', 'assets/choose_class.png');
        this.load.image('wizard_idle', 'assets/choose_class_wizard.png');
        this.load.image('wizard_sel', 'assets/choose_class_wizard_selected.png');
        this.load.image('astro_idle', 'assets/choose_class_astronomer.png');
        this.load.image('astro_sel', 'assets/choose_class_astronomer_selected.png');
        this.load.image('confirm_button', 'assets/choose_class_selected.png'); // 중앙 하단 선택 완료 버튼
        this.load.image('back_button', 'assets/choose_class_back.png');       // 우측 상단 뒤로가기 버튼
    }

    create() {
        console.log("ChooseClass: Creating scene...");
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // 1. 배경 설정
        this.add.image(centerX, centerY, 'class_bg');

        // 2. 클래스 선택 이미지 배치 (나란히)
        const classY = centerY * 0.85; // Y 위치 (화면 중앙보다 살짝 위)
        const classSpacing = width * 0.3; // 두 이미지 사이 간격

        // 마법사 이미지
        this.wizardImage = this.add.image(centerX - classSpacing / 2, classY, 'wizard_idle')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.selectClass('wizard')); // 클릭 시 selectClass 함수 호출

        // 천문학자 이미지
        this.astroImage = this.add.image(centerX + classSpacing / 2, classY, 'astro_idle')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.selectClass('astronomer'));

        // 3. 선택 완료 버튼 (중앙 하단)
        this.confirmButton = this.add.image(centerX, height * 0.85, 'confirm_button')
            .setInteractive({ useHandCursor: true })
            // .setAlpha(0.6) // 처음에는 비활성화된 것처럼 보이게 할 수 있음
            .on('pointerdown', () => this.confirmSelection());

        // 4. 뒤로가기 버튼 (우측 상단)
        const padding = 30; // 화면 가장자리로부터의 여백
        const backButton = this.add.image(width - padding, padding, 'back_button')
            .setOrigin(1, 0) // 이미지의 기준점을 우측 상단으로 설정하여 배치 용이
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log("Back button clicked! Returning to StartScene (skipping intro)...");
                // StartScene으로 돌아가되, init 데이터로 { skipIntro: true } 전달
                this.scene.start('StartScene', { skipIntro: true });
            });

        // 초기에는 확인 버튼 비활성화 스타일 (선택 사항)
        // this.updateConfirmButtonState();
    }

    // 클래스 선택 처리 함수
    selectClass(className) {
        console.log(`Class selected: ${className}`);
        this.selectedClass = className; // 선택된 클래스 이름 저장

        // 이미지 텍스처 변경
        if (className === 'wizard') {
            this.wizardImage.setTexture('wizard_sel'); // 선택된 마법사 이미지로 변경
            this.astroImage.setTexture('astro_idle');  // 천문학자는 기본 이미지로
        } else if (className === 'astronomer') {
            this.wizardImage.setTexture('wizard_idle');  // 마법사는 기본 이미지로
            this.astroImage.setTexture('astro_sel'); // 선택된 천문학자 이미지로 변경
        }

        // 확인 버튼 상태 업데이트 (선택 사항)
        // this.updateConfirmButtonState();
    }

    // 확인 버튼 상태 업데이트 함수 (선택 사항)
    // updateConfirmButtonState() {
    //     if (this.selectedClass) {
    //         this.confirmButton.setAlpha(1); // 활성화된 모습
    //     } else {
    //         this.confirmButton.setAlpha(0.6); // 비활성화된 모습
    //     }
    // }

    // 선택 완료 처리 함수
    confirmSelection() {
        if (this.selectedClass) {
            console.log(`Selection confirmed: ${this.selectedClass}`);

            // 선택된 클래스 정보를 전역 레지스트리에 저장
            // 게임의 다른 Scene에서도 this.registry.get('chosenClass') 로 접근 가능
            this.registry.set('chosenClass', this.selectedClass);
            console.log(`Stored in registry: chosenClass = ${this.registry.get('chosenClass')}`);

            // TODO: 다음 Scene (예: 실제 게임 플레이 Scene)으로 전환
            alert(`클래스 "${this.selectedClass}" 선택! 다음 씬으로 이동 로직을 구현하세요.`);
            // 예시: this.scene.start('GameScene');

        } else {
            console.log("No class selected to confirm.");
            // 선택하지 않고 확인 버튼을 눌렀을 때 피드백 (예: 버튼 흔들기)
            this.tweens.add({
                targets: this.confirmButton,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 60,
                yoyo: true, // 원래 크기로 돌아옴
                ease: 'Quad.easeInOut',
                repeat: 1 // 살짝 흔들리는 효과
            });
            // 또는 간단한 메시지 표시
            // const msg = this.add.text(this.confirmButton.x, this.confirmButton.y - 40, '클래스를 선택해주세요!', { fontSize: '16px', fill: '#ff0000' }).setOrigin(0.5);
            // this.time.delayedCall(1500, () => msg.destroy());
        }
    }

    // update(time, delta) { }
}
