import type { Artwork, Source } from './types';

/*
 * ─────────────────────────────────────────────────────────────
 *  작품 데이터 (선생님이 수정하는 곳)
 * ─────────────────────────────────────────────────────────────
 *  · 2026-11-04, 국립중앙박물관 소장품 페이지 6곳의 해설문과 한 문장씩 대조했습니다.
 *    각 작품의 officialCommentary 에 해설 전문을, 각 단서의 evidence 에
 *    근거가 된 원문 문장을 옮겨 두었습니다.
 *  · 단서 문장은 해설에 있는 내용 또는 그림에서 직접 보이는 내용만 씁니다.
 *    해설에 없는 내용(예: 누가 어떤 신분인지)은 덧붙이지 않습니다.
 *  · 이미지 파일은 소장품 페이지의 공식 이미지와 같은 그림인지 대조했습니다(크기만 작음).
 *  · 새 단서를 추가하면 verificationStatus 를 'needs-review' 로 두고,
 *    공식 자료와 대조한 뒤 'verified' 로 바꾸세요. 근거가 없으면 'unverified'
 *    (학생 화면에서 자동으로 숨겨짐).
 *  · 자세한 방법은 README.md 의 "콘텐츠 수정 방법"을 보세요.
 */

const NMK = '국립중앙박물관';
const nmkPage = (relicId: number) =>
  `https://www.museum.go.kr/MUSEUM/contents/M0502000000.do?schM=view&searchId=search&relicId=${relicId}`;
const nmkSource = (relicId: number): Source => ({
  label: '국립중앙박물관 소장품 해설',
  url: nmkPage(relicId),
  checked: true,
});

const common = {
  artist: '김홍도',
  collection: NMK,
  category: '단원 풍속도첩',
  imageCredit: `${NMK} 소장품 검색`,
  imageLicense: '공공누리 제1유형(출처표시)',
  sourceUrlChecked: true,
  verificationStatus: 'verified' as const,
};

const OBSERVE = [
  '그림 속 사람들은 무엇을 하고 있나요?',
  '어떤 모습을 보고 당시의 생활을 짐작할 수 있나요?',
];

export const artworks: Artwork[] = [
  {
    ...common,
    id: 'ssireum',
    title: '씨름',
    subtitle: '놀이와 여가',
    museumNumber: '본관6504-22',
    imagePath: 'images/ssireum.jpg',
    sourceUrl: nmkPage(551),
    observationQuestions: OBSERVE,
    imaginationQuestions: ['씨름을 하는 사람과 구경하는 사람들은 어떤 마음이었을까요?'],
    teacherCautions: [],
    officialCommentary:
      '<씨름>은 그의 풍속화 특징을 대표할 만한 명품에 속한다. 두 무리의 구경꾼들을 화면의 위아래에 둥글게 배치하여 가운데 공간을 연 다음, 서로 맞붙어 힘을 겨루는 두 사람의 씨름꾼을 그려 넣어 그림의 중심을 잡았다. 왼쪽에 서 있는 엿장수는 구경꾼들의 관심 밖에 있으면서도 이 원형 구도에 도움을 주고 있으며, 벗어 놓은 신발은 오른쪽으로 터진 여백을 좁히는 구실을 하고 있다. 이처럼 빈틈없이 짜인 구성과 함께 간결한 붓질로 풍부하게 묘사한 인물들의 표정과 열띤 좌중의 분위기가 김홍도의 비범한 재능을 잘 나타내고 있다. 인물들이 입고 있는 무명옷의 질감에 맞추어 구사된 투박한 필치와 둥글넙적한 얼굴, 동글동글한 눈매도 그가 즐겨 다룬 풍속 인물에서 공통적으로 보이는 특징이다.',
    historicalClues: [
      {
        id: 'ssireum-1',
        kind: 'people',
        title: '가운데에서 맞붙은 두 사람',
        description: '그림 가운데에서 두 사람이 서로 맞붙어 힘을 겨루며 씨름을 하고 있어요.',
        basis: 'observation',
        sources: [nmkSource(551)],
        verificationStatus: 'verified',
        region: { x: 0.409, y: 0.321, width: 0.394, height: 0.428 },
        evidence: '서로 맞붙어 힘을 겨루는 두 사람의 씨름꾼을 그려 넣어 그림의 중심을 잡았다.',
      },
      {
        id: 'ssireum-2',
        kind: 'tools',
        title: '벗어 놓은 신발',
        description: '그림 오른쪽에는 누군가 벗어 놓은 신발들이 놓여 있어요.',
        basis: 'official',
        sources: [nmkSource(551)],
        verificationStatus: 'verified',
        region: { x: 0.8, y: 0.57, width: 0.18, height: 0.115 },
        evidence: '벗어 놓은 신발은 오른쪽으로 터진 여백을 좁히는 구실을 하고 있다.',
        teacherNote:
          '해설은 신발을 누가 벗었는지 밝히지 않으므로 "누군가"로 썼습니다. 구경꾼이 위아래 두 무리로 둥글게 앉아 있다는 해설 내용은 단서에서 빠졌으니, 필요하면 수업에서 함께 이야기해 주세요.',
      },
      {
        id: 'ssireum-3',
        kind: 'background',
        title: '엿을 파는 사람',
        description: '그림 왼쪽에는 엿장수(엿을 파는 사람)가 서 있어요.',
        basis: 'official',
        sources: [nmkSource(551)],
        verificationStatus: 'verified',
        region: { x: 0.031, y: 0.460, width: 0.252, height: 0.299 },
        evidence: '왼쪽에 서 있는 엿장수는 구경꾼들의 관심 밖에 있으면서도 이 원형 구도에 도움을 주고 있으며',
      },
    ],
  },
  {
    ...common,
    id: 'seodang',
    title: '서당',
    subtitle: '교육과 배움',
    museumNumber: '본관6504-23',
    imagePath: 'images/seodang.jpg',
    sourceUrl: nmkPage(552),
    observationQuestions: OBSERVE,
    imaginationQuestions: [
      '울고 있는 아이는 어떤 마음일까요?',
      '다른 학동들은 어떤 생각을 하고 있을까요?',
    ],
    teacherCautions: [
      '아이가 우는 정확한 이유를 확정된 사실로 설명하지 않습니다. 공식 해설에도 우는 이유는 나오지 않습니다.',
    ],
    officialCommentary:
      '쪼그리고 돌아앉아 훌쩍이는 학동을 화면의 초점에 두고, 그 주위에 방건(方巾)을 쓰고 유생의 옷차림을 한 훈장을 축으로 학동들을 둥글게 배치하였다. 화면의 구성이나 생략된 배경, 옷주름의 필치, 얼굴 모습 등 모두가 현장감 넘치는 분위기를 준다. 서러움이 완연한 학동의 표정도 재미있지만, 주변 인물들의 익살스러운 모습에도 정감이 넘쳐나, 보는 이로 하여금 절로 미소를 머금게 한다.',
    historicalClues: [
      {
        id: 'seodang-1',
        kind: 'people',
        title: '훈장과 학동들',
        description:
          '방건(네모난 모자)을 쓰고 선비 옷차림을 한 훈장을 가운데 두고, 여러 학동(배우는 아이)이 둥글게 앉아 있어요.',
        basis: 'official',
        sources: [nmkSource(552)],
        verificationStatus: 'verified',
        region: { x: 0.014, y: 0.070, width: 0.821, height: 0.524 },
        evidence: '그 주위에 방건(方巾)을 쓰고 유생의 옷차림을 한 훈장을 축으로 학동들을 둥글게 배치하였다.',
        teacherNote: '해설의 "유생의 옷차림"을 5학년 눈높이에 맞춰 "선비 옷차림"으로 풀었습니다.',
      },
      {
        id: 'seodang-2',
        kind: 'tools',
        title: '책과 책상',
        description: '훈장 앞에는 낮은 책상이 놓여 있고, 학동들 앞에는 책이 펼쳐져 있어요.',
        basis: 'observation',
        sources: [nmkSource(552)],
        verificationStatus: 'verified',
        region: { x: 0.02, y: 0.27, width: 0.82, height: 0.33 },
        evidence: '그림에서 직접 관찰 (해설에는 책과 책상에 대한 설명이 없음)',
        teacherNote: '해설에 없는 내용이라 그림에서 보이는 모습만 적었습니다. 책상의 이름(서안·경상 등)이나 책의 내용은 근거가 없어 쓰지 않았습니다.',
      },
      {
        id: 'seodang-3',
        kind: 'background',
        title: '돌아앉아 훌쩍이는 아이',
        description:
          '한 학동이 쪼그리고 돌아앉아 훌쩍이고 있어요. 왜 우는지는 그림과 박물관 해설만으로는 알 수 없어요.',
        basis: 'official',
        sources: [nmkSource(552)],
        verificationStatus: 'verified',
        region: { x: 0.262, y: 0.385, width: 0.236, height: 0.231 },
        evidence: '쪼그리고 돌아앉아 훌쩍이는 학동을 화면의 초점에 두고 … 서러움이 완연한 학동의 표정',
        teacherNote:
          '초안의 "다른 사람들에게 등을 돌리고"는 해설에 없는 표현이라 해설대로 "돌아앉아"로 고쳤습니다. 책과 책상을 단서 2로 넣으면서, 이전 단서 3이던 "주변 학동들의 익살스러운 모습"(해설: 주변 인물들의 익살스러운 모습에도 정감이 넘쳐나)은 뺐습니다. 다른 학동들의 표정은 상상 질문에서 다룹니다.',
      },
    ],
  },
  {
    ...common,
    id: 'matweaving',
    title: '자리짜기',
    subtitle: '가족의 생활과 생업',
    museumNumber: '본관6504-13',
    imagePath: 'images/matweaving.jpg',
    sourceUrl: nmkPage(542),
    observationQuestions: OBSERVE,
    imaginationQuestions: [
      '가족들이 각자 하는 일은 무엇일까요?',
      '같은 공간에서 서로 다른 일을 하는 사람들은 어떤 생각을 하고 있을까요?',
    ],
    teacherCautions: [
      '「길쌈」과 다른 작품입니다. 이미지(소장품번호 본관6504-13)가 「자리짜기」인 것을 공식 이미지와 대조해 확인했습니다.',
      '공식 해설에는 "부모는 글 읽는 아들이 대견스러워 일을 하면서도 힘든 줄을 모른다"는 감정 해석이 있습니다. 인물의 마음은 학생이 상상할 몫이므로 단서에는 넣지 않았습니다.',
    ],
    officialCommentary:
      '어린 아들의 글 읽는 소리에 맞추어 아버지는 자리를 짜고 어머니는 물레를 돌려 실을 뽑아내고 있다. 아들은 낮에 서당에서 배운 천자문을 부모님 앞에서 자랑스레 막대기로 짚어가며 읽어 보이고 있다. 부모는 글 읽는 아들이 대견스러워 일을 하면서도 힘든 줄을 모른다. <자리짜기>에서는 서민 가정의 유일한 희망을 읽을 수 있다.',
    historicalClues: [
      {
        id: 'matweaving-1',
        kind: 'people',
        title: '자리를 짜는 아버지',
        description: '아버지가 자리(바닥에 까는 돗자리)를 짜고 있어요.',
        basis: 'official',
        sources: [nmkSource(542)],
        verificationStatus: 'verified',
        region: { x: 0.327, y: 0.416, width: 0.647, height: 0.506 },
        evidence: '아버지는 자리를 짜고',
      },
      {
        id: 'matweaving-2',
        kind: 'tools',
        title: '물레를 돌리는 어머니',
        description: '어머니는 물레를 돌려 실을 뽑아내고 있어요.',
        basis: 'official',
        sources: [nmkSource(542)],
        verificationStatus: 'verified',
        region: { x: 0.016, y: 0.233, width: 0.522, height: 0.345 },
        evidence: '어머니는 물레를 돌려 실을 뽑아내고 있다.',
      },
      {
        id: 'matweaving-3',
        kind: 'background',
        title: '글을 읽는 아들',
        description: '어린 아들은 부모님 앞에서 막대기로 글자를 짚어 가며 글을 읽고 있어요.',
        basis: 'official',
        sources: [nmkSource(542)],
        verificationStatus: 'verified',
        region: { x: 0.563, y: 0.200, width: 0.348, height: 0.205 },
        evidence: '아들은 낮에 서당에서 배운 천자문을 부모님 앞에서 자랑스레 막대기로 짚어가며 읽어 보이고 있다.',
        teacherNote: '해설의 "천자문", "자랑스레"는 넣지 않았습니다. 수업에서 「서당」과 연결해 이야기할 때 활용할 수 있습니다.',
      },
    ],
  },
  {
    ...common,
    id: 'threshing',
    title: '벼타작',
    subtitle: '농업과 노동',
    museumNumber: '본관6504-14',
    imagePath: 'images/threshing.jpg',
    sourceUrl: nmkPage(543),
    observationQuestions: OBSERVE,
    imaginationQuestions: [
      '그림 속 사람들은 각각 어떤 일을 하고 있나요?',
      '인물들의 행동에서 어떤 차이를 발견할 수 있나요?',
    ],
    teacherCautions: [
      '소장품 페이지의 작품명은 「벼타작」이고, 다른 명칭으로 「타작」이 함께 적혀 있습니다.',
      '공식 해설은 "신분적 갈등과 대립 관계에 있는 사람들"이라고만 하고, 그림 속 누가 어떤 신분인지는 밝히지 않습니다. 특정 인물의 신분을 사실처럼 말하지 않도록 해 주세요.',
    ],
    officialCommentary:
      '<벼타작>은 신분적 갈등과 대립 관계에 있는 사람들을 한 장면에 그린 그림이지만 이 그림에서는 서구의 사실주의 회화에서 볼 수 있는 현실 부정이나 격렬한 대립감 같은 것은 찾아볼 수 없다. 이것은 김홍도가 해학과 중용의 눈으로 그들을 바라보았기 때문이라 할 수 있을 것이다.',
    historicalClues: [
      {
        id: 'threshing-1',
        kind: 'people',
        title: '벼를 타작하는 사람들',
        description: '그림 속 사람들이 볏단을 내리쳐 낟알을 떨어내는 벼타작을 하고 있어요.',
        basis: 'observation',
        sources: [nmkSource(543)],
        verificationStatus: 'verified',
        region: { x: 0.287, y: 0.446, width: 0.540, height: 0.345 },
        evidence: '작품명 「벼타작」 (해설에는 타작 방법에 대한 설명이 없어, 그림에서 보이는 모습으로 썼습니다)',
      },
      {
        id: 'threshing-2',
        kind: 'tools',
        title: '저마다 다른 일',
        description: '볏단을 내리치는 사람, 볏단을 나르는 사람, 비로 낟알을 쓸어 모으는 사람처럼 저마다 다른 일을 하고 있어요.',
        basis: 'observation',
        sources: [nmkSource(543)],
        verificationStatus: 'verified',
        region: { x: 0.024, y: 0.694, width: 0.427, height: 0.291 },
        evidence: '그림에서 직접 관찰 (해설에는 개별 작업에 대한 설명이 없음)',
        teacherNote: '그림에서 보이는 모습만 적었습니다. 부분 확대는 비로 쓰는 사람을 보여 줍니다.',
      },
      {
        id: 'threshing-3',
        kind: 'background',
        title: '신분이 다른 사람들',
        description:
          '박물관은 이 그림에 신분이 서로 다른 사람들이 한 장면에 함께 그려져 있다고 설명해요. 그러면서도 서로 심하게 맞서는 느낌은 찾아볼 수 없다고 해요.',
        basis: 'official',
        sources: [nmkSource(543)],
        verificationStatus: 'verified',
        region: null,
        regionNote: '그림 속 여러 사람의 관계에 대한 설명이라, 그림의 한 곳에 번호를 달지 않았어요. 그림 전체를 보며 찾아보세요.',
        evidence:
          '<벼타작>은 신분적 갈등과 대립 관계에 있는 사람들을 한 장면에 그린 그림이지만 … 현실 부정이나 격렬한 대립감 같은 것은 찾아볼 수 없다.',
        teacherNote:
          '해설이 특정 인물을 가리키지 않으므로 부분 확대(누워 있는 사람)를 일부러 뺐습니다. 누가 어떤 처지인지는 학생이 그림을 보고 추론하게 해 주세요.',
      },
    ],
  },
  {
    ...common,
    id: 'tavern',
    title: '주막',
    subtitle: '여행과 경제생활',
    museumNumber: '본관6504-8',
    imagePath: 'images/tavern.jpg',
    sourceUrl: nmkPage(537),
    observationQuestions: OBSERVE,
    imaginationQuestions: ['주막을 찾은 사람들은 어떤 하루를 보내고 있었을까요?'],
    teacherCautions: [
      '공식 해설은 손님을 "여행 중인 중년 부부"라고 설명합니다. 그림 속 누가 그 부부인지는 해설에 나오지 않습니다.',
    ],
    officialCommentary:
      '여행 중에 중년 부부가 간이주막에서 요기하는 광경을 그린 것이다. 국자로 막걸리를 떠내는 주모의 모습이나 부뚜막 위의 밥 양푼과 술사발들이 당시 주막의 풍경을 잘 전해준다. 앞쪽의 풍경에는 역원근법을 적용해 화면 속으로 들어간 듯한 현실감을 살렸다.',
    historicalClues: [
      {
        id: 'tavern-1',
        kind: 'people',
        title: '주막에서 요기하는 나그네',
        description: '박물관은 이 그림이 여행 중인 중년 부부가 간이 주막에서 요기(간단히 배를 채움)하는 모습이라고 설명해요.',
        basis: 'official',
        sources: [nmkSource(537)],
        verificationStatus: 'verified',
        region: { x: 0.439, y: 0.539, width: 0.408, height: 0.299 },
        evidence: '여행 중에 중년 부부가 간이주막에서 요기하는 광경을 그린 것이다.',
        teacherNote: '부분 확대는 음식을 먹고 있는 손님을 보여 줍니다. 해설이 말하는 "부부"가 누구인지는 학생과 함께 추론해 보세요.',
      },
      {
        id: 'tavern-2',
        kind: 'tools',
        title: '국자로 막걸리를 뜨는 주모',
        description: '주모(주막의 여주인)는 국자로 막걸리를 떠내고 있어요.',
        basis: 'official',
        sources: [nmkSource(537)],
        verificationStatus: 'verified',
        region: { x: 0.018, y: 0.507, width: 0.354, height: 0.256 },
        evidence: '국자로 막걸리를 떠내는 주모의 모습',
      },
      {
        id: 'tavern-3',
        kind: 'background',
        title: '부뚜막 위의 그릇들',
        description: '부뚜막 위에는 밥을 담은 양푼과 술사발들이 놓여 있어 그때 주막의 모습을 보여 줘요.',
        basis: 'official',
        sources: [nmkSource(537)],
        verificationStatus: 'verified',
        region: { x: 0.018, y: 0.603, width: 0.435, height: 0.213 },
        evidence: '부뚜막 위의 밥 양푼과 술사발들이 당시 주막의 풍경을 잘 전해준다.',
      },
    ],
  },
  {
    ...common,
    id: 'gonu',
    title: '고누놀이',
    subtitle: '전통 놀이',
    museumNumber: '본관6504-9',
    imagePath: 'images/gonu.jpg',
    sourceUrl: nmkPage(538),
    observationQuestions: OBSERVE,
    imaginationQuestions: ['그림 속 놀이를 즐기는 사람들은 어떤 생각과 감정을 느꼈을까요?'],
    teacherCautions: [
      '공식 해설도 고누의 "정확한 유래는 알 수 없다"고 합니다. 유래나 그림 속 놀이 방법을 확정하지 않습니다.',
      '공식 해설은 고누 놀이 일반만 설명하고, 그림 속 인물(지게와 나뭇짐 옆 사람들 등)이 누구인지는 설명하지 않습니다.',
    ],
    officialCommentary:
      '고누는 우리 선조들이 많이 즐기던 놀이의 하나로, 정확한 유래는 알 수 없지만 아주 오래 전부터 전해져 내려오는 놀이다. 고누는 오랜 세월을 거쳐 전해져 온 탓에 고니, 꼬니, 꼰질이, 고노 등으로 부르는 이름마저 다양하다. 또한 각 놀이판의 이름도 다르고 같은 놀이판이라도 지방에 따라 그 놀이 방법이 조금씩 다르다.',
    historicalClues: [
      {
        id: 'gonu-1',
        kind: 'people',
        title: '오래 전해 온 놀이, 고누',
        description: '고누는 우리 조상들이 많이 즐기던 놀이예요. 정확한 유래는 알 수 없지만 아주 오래전부터 전해 내려왔어요.',
        basis: 'official',
        sources: [nmkSource(538)],
        verificationStatus: 'verified',
        region: { x: 0.047, y: 0.373, width: 0.696, height: 0.443 },
        evidence: '고누는 우리 선조들이 많이 즐기던 놀이의 하나로, 정확한 유래는 알 수 없지만 아주 오래 전부터 전해져 내려오는 놀이다.',
        teacherNote: '부분 확대는 땅바닥에서 놀이를 하는 사람들을 보여 줍니다.',
      },
      {
        id: 'gonu-2',
        kind: 'tools',
        title: '여러 가지 이름',
        description: '고누는 고니, 꼬니, 꼰질이, 고노처럼 부르는 이름이 여러 가지예요.',
        basis: 'official',
        sources: [nmkSource(538)],
        verificationStatus: 'verified',
        region: null,
        regionNote: '고누 놀이 전체에 대한 설명이라, 그림의 한 곳에 번호를 달지 않았어요.',
        evidence: '고니, 꼬니, 꼰질이, 고노 등으로 부르는 이름마저 다양하다.',
        teacherNote: '해설에 따라 "꼰질이"를 추가했습니다.',
      },
      {
        id: 'gonu-3',
        kind: 'background',
        title: '지방마다 조금씩 다른 놀이 방법',
        description: '놀이판마다 이름이 다르고, 같은 놀이판이라도 지방에 따라 노는 방법이 조금씩 달라요.',
        basis: 'official',
        sources: [nmkSource(538)],
        verificationStatus: 'verified',
        region: null,
        regionNote: '고누 놀이 전체에 대한 설명이라, 그림의 한 곳에 번호를 달지 않았어요.',
        evidence: '각 놀이판의 이름도 다르고 같은 놀이판이라도 지방에 따라 그 놀이 방법이 조금씩 다르다.',
      },
    ],
  },
];

export const findArtwork = (id: string) => artworks.find((a) => a.id === id);

export const CLUE_KIND_LABEL: Record<string, string> = {
  people: '인물과 행동',
  tools: '생활 방식과 도구',
  background: '배경과 생활 문화',
};
