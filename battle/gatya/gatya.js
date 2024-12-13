//修正元
// Firebaseの設定
const firebaseConfig = {
    projectId: "deck-dreamers",  // FirebaseプロジェクトID
    organizationId: "oic-ok.ac.jp",  // 組織ID
    projectNumber: "165933225805"  // プロジェクト番号
};

// Firebaseを初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();  // Firestoreデータベースへの参照を取得

// DOM要素の取得
const gachaButton = document.getElementById('gachaButton');  // ガチャボタン
const gachaResult = document.getElementById('gachaResult');  // ガチャ結果表示用テキストエリア
const gachaCapsule = document.getElementById('gachaCapsule');  // ガチャカプセルの要素
const gachaCapsuleImage = document.getElementById('gachaCapsuleImage');  // ガチャカプセルの画像

// ガチャアイテムのデータ
const GACHA_ITEMS = [
    {
        name: '徳田家ののりちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/N-%E5%BE%B3%E7%94%B0%E5%AE%B6%E3%81%AE%E3%81%AE%E3%82%8A%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+1',
        count: 20,
        rarity: 'N',
        weight: 35
    },
    {
        name: '学祭のピザ',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/R-%E5%AD%A6%E7%A5%AD%E3%81%AE%E3%83%94%E3%82%B6.png',
        effect: '回復+1',
        count: 10,
        rarity: 'R',
        weight: 30
    },
    {
        name: '二郎系',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/R-%E4%BA%8C%E9%83%8E%E7%B3%BB.png',
        effect: '攻撃力+1',
        count: 10,
        rarity: 'R',
        weight: 30
    },
    {
        name: '河合家のりょうちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SR-%E6%B2%B3%E5%90%88%E5%AE%B6%E3%81%AE%E3%82%8A%E3%82%87%E3%81%86%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+2',
        count: 5,
        rarity: 'SR',
        weight: 15
    },
    {
        name: '喜友名家のともちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SR-%E5%96%9C%E5%8F%8B%E5%90%8D%E5%AE%B6%E3%81%AE%E3%81%A8%E3%82%82%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+2',
        count: 5,
        rarity: 'SR',
        weight: 15
    },
    {
        name: '金田家のしょうちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SR-%E9%87%91%E7%94%B0%E5%AE%B6%E3%81%AE%E3%81%97%E3%82%87%E3%81%86%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+2',
        count: 5,
        rarity: 'SR',
        weight: 15
    },
    {
        name: '佐藤家のやまちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SR-%E4%BD%90%E8%97%A4%E5%AE%B6%E3%81%AE%E3%82%84%E3%81%BE%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+2',
        count: 5,
        rarity: 'SR',
        weight: 15
    },
    {
        name: '中野家のてんちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SR-%E4%B8%AD%E9%87%8E%E5%AE%B6%E3%81%AE%E3%81%A6%E3%82%93%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '攻撃力+2',
        count: 5,
        rarity: 'SR',
        weight: 15
    },
    {
        name: '先生集合',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/R-%E5%85%88%E7%94%9F%E9%9B%86%E5%90%88.png',
        effect: '攻撃力+5',
        count: 2,
        rarity: 'SSR',
        weight: 5
    },
    {
        name: '佐藤家のてんちゃん',
        image: 'https://raw.githubusercontent.com/togeharuki/Deck-Dreamers/refs/heads/Deck-Dreamers/battle/gatya/%E5%86%99%E7%9C%9F/SSR-%E4%BD%90%E8%97%A4%E5%AE%B6%E3%81%AE%E3%81%A6%E3%82%93%E3%81%A1%E3%82%83%E3%82%93.png',
        effect: '回復力+5',
        count: 2,
        rarity: 'SSR',
        weight: 5
    },
];

let items = [];  // ガチャアイテムの状態（残り個数など）
let playerId = null;  // プレイヤーのID
let cardCounter = 1;  // カードIDのインクリメンタルカウンタ

// アイテムを重み付けでランダムに選ぶ関数
function weightedRandomSelect() {
    const availableItems = items.filter(item => item.count > 0);
    if (availableItems.length === 0) return null;

    const totalWeight = availableItems.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of availableItems) {
        random -= item.weight;
        if (random <= 0) {
            return item;
        }
    }
    return availableItems[0];
}

// ガチャの初期化
async function initializeGacha() {
    playerId = localStorage.getItem('playerId');
    if (!playerId) {
        alert('ログインが必要です');
        window.location.href = '../login.html';
        return;
    }

    try {
        const soukoRef = db.collection('Souko').doc(playerId);
        const soukoDoc = await soukoRef.get();

        if (!soukoDoc.exists || !soukoDoc.data().gachaItems) {
            const initialGachaData = {
                gachaItems: GACHA_ITEMS,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            };
            await soukoRef.set(initialGachaData, { merge: true });
            items = [...GACHA_ITEMS];
        } else {
            items = soukoDoc.data().gachaItems;
        }

        displayItemsRemaining();
        updateButtonState();
    } catch (error) {
        console.error('初期化エラー:', error);
        alert(`データの読み込みに失敗しました: ${error.message}`);
    }
}
document.addEventListener('DOMContentLoaded', initializeGacha);

// ガチャアイテムをSoukoに追加する関数
async function addCardToSouko(card) {
    try {
        const soukoRef = db.collection('Souko').doc(playerId);
        cardCounter++;  // カウンタをインクリメント
        const cardId = `default_card_${cardCounter}`;  // インクリメンタルなカードIDを生成

        // Firestoreにカードを追加し、保存数をインクリメント
        await soukoRef.set({
            [`${cardId}`]: {
                name: card.name,
                type: 'gacha',
                effect: card.effect,
                image: card.image,
                explanation: card.explanation,
                rarity: card.rarity,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            },
            savedCount: firebase.firestore.FieldValue.increment(100)  // 保存数をインクリメント
        }, { merge: true });
    } catch (error) {
        console.error('カード追加エラー:', error);
        alert(`カードを追加できませんでした: ${error.message}`);
        throw error;
    }
}

// ガチャ結果を処理する関数
async function handleGachaResult() {
    const selectedItem = weightedRandomSelect();
    if (!selectedItem) {
        alert('在庫がありません。');
        return;
    }

    const itemIndex = items.findIndex(item => item.name === selectedItem.name);
    if (itemIndex !== -1) {
        items[itemIndex].count--;
    }

    try {
        await addCardToSouko(selectedItem);
        await updateGachaData();

        setTimeout(() => {
            gachaResult.value = `★${selectedItem.rarity}★\n${selectedItem.name}\n効果: ${selectedItem.effect}`;
            gachaCapsuleImage.src = selectedItem.image;
            displayItemsRemaining();
            updateButtonState();
        }, 2000);
    } catch (error) {
        console.error('結果処理エラー:', error);
        alert(`処理に失敗しました: ${error.message}`);
    }
}

// Firestoreのガチャデータを更新する関数
async function updateGachaData() {
    if (!playerId) return;
    try {
        const soukoRef = db.collection('Souko').doc(playerId);
        await soukoRef.update({
            gachaItems: items,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('データ更新エラー:', error);
        alert(`データを更新できませんでした: ${error.message}`);
        throw error;
    }
}

// ガチャのアニメーションを開始する関数
function triggerGachaAnimation() {
    gachaButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    gachaCapsule.style.animation = 'rotateCapsule 2s ease forwards';
}

// ガチャをリセットする関数
function resetGacha() {
    resetButton.style.display = 'none';
    gachaButton.disabled = false;
    gachaButton.style.display = 'inline-block';
    gachaResult.value = '';
    gachaCapsuleImage.src = '写真/カードの裏面.png';
    gachaCapsule.style.animation = 'none';
}

// 残りのアイテム数をコンソールに表示
function displayItemsRemaining() {
    console.clear();
    items.forEach(item => {
        console.log(`${item.rarity} ${item.name}: 残り ${item.count} 個`);
    });
}

// ボタンの状態を更新
function updateButtonState() {
    const hasAvailableItems = items.some(item => item.count > 0);
    gachaButton.disabled = !hasAvailableItems;
}

// ガチャボタンがクリックされた時の処理
gachaButton.addEventListener('click', async () => {
    try {
        gachaButton.disabled = true;
        triggerGachaAnimation();
        await handleGachaResult();

        // ガチャが完了した後にホームにリダイレクト
        window.location.href = '../home.html';  // ホームのURLに変更
    } catch (error) {
        console.error('ガチャ実行エラー:', error);
        alert('ガチャの実行に失敗しました');
        gachaButton.disabled = false;
    }
});

// エラーハンドリング（グローバルエラーハンドラー）
window.addEventListener('error', function(event) {
    console.error('エラーが発生しました:', event.error);
    alert('エラーが発生しました');
});

// 未処理のPromiseエラーをキャッチするハンドラー
window.addEventListener('unhandledrejection', function(event) {
    console.error('未処理のPromiseエラー:', event.reason);
    alert('未処理のエラーが発生しました');
});
