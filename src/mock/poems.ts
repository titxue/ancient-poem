import type { Poem, PoemListResponse, PoemQueryParams } from '../types/poem';

export const poems: Poem[] = [
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
    tags: ['抒情', '思乡', '月亮'],
    translation: [
      '床前明亮的月光，',
      '好像地上的霜一样。',
      '抬头看看这轮明月，',
      '低头想起我的故乡。'
    ],
    appreciation: '这首诗以月为媒介，抒发了诗人思乡之情。诗中的"望"与"思"两个动作，形象地表现了诗人身在异乡的孤寂与对故乡的思念。',
    notes: [
      '床前：床榻前面。',
      '疑是：好像是。',
      '举头：抬起头来。',
      '低头：低下头来。'
    ],
    background: '这首诗作于李白漫游各地时，一个月夜，诗人在旅舍中看到明亮的月光，触景生情，写下了这首脍炙人口的思乡诗。'
  },
  {
    id: 2,
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐',
    content: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。'],
    tags: ['登高', '山水', '壮志'],
    translation: [
      '夕阳依傍着山峦慢慢西沉，',
      '滔滔黄河向东流入大海。',
      '要看得更远更高更广阔，',
      '那就要再登上更高一层。'
    ],
    appreciation: '这首诗以登楼望远为主题，展现了诗人开阔的胸襟和远大的志向。诗中的"更上一层楼"既是实写，也是诗人追求进步的象征。',
    notes: [
      '鹳雀楼：位于山西省永济市蒲州镇，是一座古代建筑。',
      '依山尽：沿着山的轮廓慢慢消失。',
      '欲穷：想要看到尽头。'
    ],
    background: '这首诗作于作者登临鹳雀楼时，抒发了诗人追求进步、永不满足的精神。'
  },
  {
    id: 3,
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐',
    content: ['春眠不觉晓，', '处处闻啼鸟。', '夜来风雨声，', '花落知多少。'],
    tags: ['春天', '自然', '生活'],
    translation: [
      '春天里睡觉睡得正香，不知不觉天就亮了，',
      '四处都能听到鸟儿在鸣叫。',
      '昨天夜里刮风下雨，',
      '不知道落了多少花瓣啊。'
    ],
    appreciation: '这首诗以春天特有的景象，描绘了一个清新自然的春日早晨。诗人用听觉和视觉的感受，展现了春天的生机与变化。',
    notes: [
      '春眠：春天里的睡眠。',
      '晓：天亮。',
      '处处：到处、各处。',
      '夜来：昨天夜里。'
    ],
    background: '这首诗创作于诗人在春天的一个早晨，描绘了春天特有的景象和诗人对自然的感受。'
  },
  {
    id: 4,
    title: '相思',
    author: '王维',
    dynasty: '唐',
    content: ['红豆生南国，', '春来发几枝。', '愿君多采撷，', '此物最相思。'],
    tags: ['爱情', '相思', '植物'],
    translation: [
      '红豆生长在南方，',
      '春天来了长出几根枝条。',
      '希望你多采一些，',
      '因为它最能表达相思之情。'
    ],
    appreciation: '这首诗借红豆这种植物来表达相思之情。红豆因其鲜红的颜色和坚硬的质地，在古代常被用来象征思念之情。',
    notes: [
      '红豆：相思树的果实，古代用来象征相思之情。',
      '采撷：采摘。',
      '此物：指红豆。'
    ],
    background: '这首诗创作于诗人任职边塞时，借红豆抒发对故乡和亲人的思念之情。'
  },
  {
    id: 5,
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐',
    content: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。'],
    tags: ['山水', '壮观', '想象'],
    translation: [
      '阳光照射着香炉峰，升起紫色的云烟，',
      '远远望去瀑布像挂在前面的山川上。',
      '瀑布飞流直泻三千尺，',
      '好像是银河从九天之上倾泻而下。'
    ],
    appreciation: '这首诗以磅礴的气势描绘了庐山瀑布的壮观景象。诗人运用夸张的手法，将瀑布比作银河，展现了瀑布的宏大气势。',
    notes: [
      '香炉：指庐山的香炉峰。',
      '前川：前面的山川。',
      '三千尺：形容瀑布的高度，是夸张的说法。',
      '九天：古人认为天有九重。'
    ],
    background: '这首诗作于诗人游览庐山时，被瀑布的壮观景象所震撼，即兴创作。'
  }
];

export const getPoems = (page: number, pageSize: number): PoemListResponse => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const total = poems.length;
  
  return {
    poems: poems.slice(start, end),
    total,
    page,
    pageSize
  };
};

export const getPoemById = (id: number): Poem | undefined => {
  return poems.find(poem => poem.id === id);
};

export const searchPoems = (params: PoemQueryParams): PoemListResponse => {
  let filtered = [...poems];
  
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(poem => 
      poem.title.toLowerCase().includes(keyword) ||
      poem.author.toLowerCase().includes(keyword) ||
      poem.dynasty.toLowerCase().includes(keyword) ||
      poem.content.some(line => line.toLowerCase().includes(keyword)) ||
      poem.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
  }
  
  if (params.dynasty) {
    filtered = filtered.filter(poem => poem.dynasty === params.dynasty);
  }
  
  if (params.author) {
    filtered = filtered.filter(poem => poem.author === params.author);
  }
  
  if (params.tag && Array.isArray(params.tag)) {
    filtered = filtered.filter(poem => 
      params.tag!.every(tag => poem.tags.includes(tag))
    );
  }

  if (params.category) {
    // 根据分类筛选，这里可以根据实际需求调整筛选逻辑
    filtered = filtered.filter(poem => {
      if (params.category === '诗经') {
        return poem.title.includes('诗经');
      }
      if (params.category === '楚辞') {
        return poem.title.includes('楚辞');
      }
      if (params.category === '乐府') {
        return poem.title.includes('乐府');
      }
      // 其他分类的处理...
      return true;
    });
  }
  
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const total = filtered.length;
  
  return {
    poems: filtered.slice(start, end),
    total,
    page: params.page,
    pageSize: params.pageSize
  };
};

// 添加搜索建议功能
export const getSuggestions = (keyword: string): string[] => {
  const suggestions: Set<string> = new Set();
  
  if (!keyword) return [];
  
  const lowerKeyword = keyword.toLowerCase();
  
  // 从诗词数据中收集建议
  poems.forEach(poem => {
    // 标题建议
    if (poem.title.toLowerCase().includes(lowerKeyword)) {
      suggestions.add(`《${poem.title}》`);
    }
    
    // 作者建议
    if (poem.author.toLowerCase().includes(lowerKeyword)) {
      suggestions.add(poem.author);
    }
    
    // 朝代建议
    if (poem.dynasty.toLowerCase().includes(lowerKeyword)) {
      suggestions.add(`${poem.dynasty}代`);
    }
    
    // 标签建议
    poem.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerKeyword)) {
        suggestions.add(tag);
      }
    });
    
    // 内容建议（去除标点符号）
    poem.content.forEach(line => {
      const cleanLine = line.replace(/[，。！？、；：]/g, '');
      if (cleanLine.toLowerCase().includes(lowerKeyword)) {
        suggestions.add(cleanLine);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 10); // 限制返回10个建议
}; 