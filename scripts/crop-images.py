"""
source-images/ 의 원본(국립중앙박물관 공식 이미지, 색상표 포함)에서
그림 부분만 잘라 public/images/ 에 저장합니다.

    python3 scripts/crop-images.py

BOX 값은 원본 크기 대비 비율 (왼쪽, 위, 오른쪽, 아래) 입니다.
그림을 다시 자르면 src/data/artworks.ts 의 region 좌표도 함께 바꿔야 합니다.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BOX = {
    'ssireum':    (0.180, 0.030, 0.815, 0.965),  # 씨름은 테두리 선이 없어 종이 가장자리 기준
    'seodang':    (0.099, 0.013, 0.903, 0.967),
    'matweaving': (0.097, 0.034, 0.901, 0.962),
    'threshing':  (0.091, 0.036, 0.888, 0.964),
    'tavern':     (0.157, 0.025, 0.892, 0.962),
    'gonu':       (0.115, 0.035, 0.862, 0.960),
}

if __name__ == '__main__':
    for name, (l, t, r, b) in BOX.items():
        im = Image.open(ROOT / 'source-images' / f'{name}.jpg')
        W, H = im.size
        out = im.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
        out.save(ROOT / 'public' / 'images' / f'{name}.jpg', quality=85, optimize=True)
        print(name, im.size, '->', out.size)
