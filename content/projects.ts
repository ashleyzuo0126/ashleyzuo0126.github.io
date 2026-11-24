export type Lang = "zh" | "en";
export type Copy = { zh: string; en: string };
export const c = (zh: string, en: string): Copy => ({ zh, en });
export const categories = {
  all: c("全部足迹", "All trails"),
  ai: c("AI 产品与 Agent", "AI & agents"),
  tools: c("运营自动化", "Automation"),
  data: c("数据与学习", "Data & learning"),
  web: c("Web 与社区", "Web & community"),
};
export type Project = {
  slug: string;
  title: string;
  subtitle: Copy;
  category: Exclude<keyof typeof categories, "all">;
  character: number;
  color: string;
  tags: string[];
  kind: Copy;
  intro: Copy;
  problem: Copy;
  approach: Copy[];
  contribution: Copy | null;
  outcome: Copy;
  steps: Copy[];
  mediaRequired?: boolean;
};
const allProjects: Project[] = [
  {
    slug: "my-screenwriter",
    title: "My Screenwriter",
    subtitle: c(
      "让 AI 创作，保留人的判断。",
      "AI writes. People keep the final say.",
    ),
    category: "ai",
    character: 0,
    color: "peach",
    tags: ["FastAPI", "Multi-agent", "Human-in-the-loop"],
    kind: c("产品原型", "Product prototype"),
    mediaRequired: true,
    intro: c(
      "面向短剧开发的多智能体剧本工作台，让创作、审查与人工批注在一个可追溯的流程里协作。",
      "A multi-agent workspace for short-drama development, bringing writing, review and human feedback into a traceable workflow.",
    ),
    problem: c(
      "剧本的创作、审查和改稿需要不断往返。如何让 AI 分工协作，同时让每次修改都经过人的判断？",
      "Writing, review and revision involve repeated handoffs. How can AI agents collaborate while people retain control of every iteration?",
    ),
    approach: [
      c(
        "Writer 负责剧情创作，五类 Reviewer 分别审查结构、人物、留存付费、连续性与制作可行性。",
        "One Writer owns story creation; five Reviewers examine structure, characters, retention and paywalls, continuity, and production feasibility.",
      ),
      c(
        "每轮结束停在人工审阅节点；用户批注后显式发起下一轮，或批准定稿。",
        "Each iteration stops at a human review gate. Users add comments and explicitly generate a revision or finalize the draft.",
      ),
      c(
        "保存不可变版本，由 Chief Editor 汇总修改要求，再由 Verification 检查落实情况。",
        "Immutable versions preserve history. A Chief Editor consolidates revision requests, and Verification checks their implementation.",
      ),
    ],
    contribution: null,
    outcome: c(
      "仓库提供 Web 工作台、REST API、SQLite 持久化，以及 Mock 和远程模型适配器；当前为 MVP。",
      "The MVP includes a web workspace, REST API, SQLite persistence, and mock and remote model adapters.",
    ),
    steps: [
      c("创作需求", "Creative brief"),
      c("生成与审查", "Write & review"),
      c("人工批注", "Human feedback"),
      c("修改或定稿", "Revise or finalize"),
    ],
  },
  {
    slug: "William",
    title: "William",
    subtitle: c(
      "给情绪一个被理解的空间。",
      "A little space to feel understood.",
    ),
    category: "ai",
    character: 1,
    color: "pink",
    tags: ["Product design", "UI / UX", "RAG"],
    kind: c("团队项目", "Team project"),
    mediaRequired: true,
    intro: c(
      "关注情绪感知、记忆、日程与语音交互的个人 AI 陪伴原型。在持续陪伴中，也让用户掌握自己的记忆与隐私。",
      "A personal AI companion prototype for emotional awareness, memory, planning and voice, with user control over memory and privacy.",
    ),
    problem: c(
      "陪伴体验既需要连续性，也需要清晰的控制感：用户应当知道系统记住了什么，并能选择临时对话。",
      "A companion needs continuity and clear user control: people should understand what is remembered and be able to choose temporary conversations.",
    ),
    approach: [
      c(
        "以 Today、William、Journey、You 四个模块组织日常入口、对话、旅程与个人设置。",
        "Four modules—Today, William, Journey and You—organize daily touchpoints, conversation, reflection and personal settings.",
      ),
      c(
        "规划 Classic 与 Digital Expert 双模式，以及语音、记忆开关和日程候选的关键交互。",
        "Classic and Digital Expert modes offer distinct experiences, supported by voice interactions, memory controls and schedule suggestions.",
      ),
      c(
        "围绕“感知—识别—归因—干预—反馈”组织产品闭环，团队接入知识库与长期记忆能力。",
        "The product follows an awareness-to-feedback loop; the team integrated knowledge retrieval and long-term memory.",
      ),
    ],
    contribution: c(
      "产品设计、UI 设计。围绕情绪支持场景规划模块与关键用户流程，梳理双模式对话、语音、记忆和日程候选的交互。技术实现属于团队成果。",
      "Product design and UI design: structuring modules and user journeys for emotional support, including dual-mode chat, voice, memory and schedule interactions. Engineering implementation is a team outcome.",
    ),
    outcome: c(
      "团队落地 React / Express / MySQL 原型，获得爱 XIA 创·厦门黑客松三等奖。项目为情绪陪伴实验应用，不提供医疗诊断。",
      "The team built a React / Express / MySQL prototype and received third prize at the Ai Xia Chuang Xiamen hackathon. This experimental companion does not provide medical diagnosis.",
    ),
    steps: [
      c("日常感知", "Daily check-in"),
      c("模式选择", "Choose a mode"),
      c("对话陪伴", "Conversation"),
      c("回顾与控制", "Reflect & control"),
    ],
  },
  {
    slug: "The-Sixth-ELement",
    title: "The Sixth Element",
    subtitle: c(
      "让每一次填写，都带来回应。",
      "Every response starts an exchange.",
    ),
    category: "ai",
    character: 6,
    color: "blue",
    tags: ["Vue", "Django", "Product mechanics"],
    kind: c("团队项目 · SurveyFiller", "Team project · SurveyFiller"),
    mediaRequired: true,
    intro: c(
      "面向高校学生与科研人员的问卷互助平台，通过“填写得分—发布扣分”建立持续的互助动力。",
      "A survey exchange for students and researchers, using an earn-by-answering, spend-to-publish points loop.",
    ),
    problem: c(
      "问卷发布后难以获得足够回应，单次互填也缺少持续动力。需要把个人需求与社区供给连接起来。",
      "Survey creators struggle to gather responses, and one-off exchanges lack sustained motivation. The product connects individual needs with community participation.",
    ),
    approach: [
      c(
        "以积分机制连接任务浏览、问卷填写与发布，提供可追溯的积分流水。",
        "Points connect task discovery, survey completion and publishing, backed by a transaction history.",
      ),
      c(
        "团队加入 AI 题目生成、向量推荐和分析看板，支持问卷从创建到回收。",
        "The team added AI question generation, vector-based recommendations and analytics to support the survey lifecycle.",
      ),
    ],
    contribution: c(
      "负责任务大厅前端页面与后端积分逻辑，规划浏览、填写、积分获取和发布路径；参与线上部署。",
      "Responsible for the task-hall frontend and backend points logic, shaping the browse, answer, earn and publish journey; contributed to deployment.",
    ),
    outcome: c(
      "完成线上部署，获得 2026 年计算机设计大赛福建省二等奖。其他产品模块按团队成果展示。",
      "Deployed online and received second prize in Fujian at the 2026 Computer Design Competition. Other modules are presented as team outcomes.",
    ),
    steps: [
      c("浏览问卷", "Discover"),
      c("参与填写", "Respond"),
      c("获取积分", "Earn points"),
      c("发布问卷", "Publish"),
    ],
  },
  {
    slug: "feishu_xl_tools",
    title: "Feishu XL Tools",
    subtitle: c(
      "从一张截图，到一行好数据。",
      "From a screenshot to structured data.",
    ),
    category: "tools",
    character: 4,
    color: "green",
    tags: ["FastAPI", "Qwen Vision", "Feishu"],
    kind: c("运营工具", "Operations tool"),
    mediaRequired: true,
    intro: c(
      "千川直播数据截图识别与飞书多维表格录入工具，将视觉识别、字段映射和人工确认串联起来。",
      "A tool that turns Qianchuan livestream screenshots into Feishu Base records, combining visual extraction, field mapping and human confirmation.",
    ),
    problem: c(
      "运营数据以截图形式流转时，重复录入与字段不一致会增加整理成本。",
      "When operations data arrives as screenshots, repetitive entry and inconsistent fields create extra work.",
    ),
    approach: [
      c(
        "使用 Qwen 视觉模型提取截图指标，按自定义映射规则转换为目标字段。",
        "Qwen Vision extracts metrics, which are mapped to target fields using configurable instructions.",
      ),
      c(
        "先展示可编辑的识别结果，再由用户确认写入飞书多维表格。",
        "Editable previews let users correct the extracted data before confirming a write to Feishu Base.",
      ),
    ],
    contribution: null,
    outcome: c(
      "仓库包含 HTML / JavaScript 前端、FastAPI 后端和 Docker 部署配置。实际节省时间与使用规模暂未披露。",
      "The repository includes an HTML / JavaScript frontend, FastAPI backend and Docker configuration. Time savings and adoption figures have not been published.",
    ),
    steps: [
      c("上传截图", "Upload"),
      c("字段映射", "Map fields"),
      c("预览校验", "Review"),
      c("确认录入", "Confirm"),
    ],
  },
  {
    slug: "e-commerce",
    title: "E-commerce Intelligence",
    subtitle: c(
      "顺着数据，找到下一个问题。",
      "Follow the data. Find the next question.",
    ),
    category: "data",
    character: 3,
    color: "blue",
    tags: ["Python", "Pandas", "Machine learning"],
    kind: c("公开数据学习实践", "Public-data learning project"),
    intro: c(
      "围绕公开电商数据集构建的 16 个分析练习模块，从数据清洗逐步走向用户分层、预测与推荐。",
      "Sixteen practice modules built around a public e-commerce dataset, progressing from cleaning to segmentation, prediction and recommendations.",
    ),
    problem: c(
      "业务分析需要把多张表、多个指标组织成连贯的问题链，并理解不同分析方法的适用范围。",
      "Business analysis requires connecting tables and metrics into coherent questions, while understanding the limits of each method.",
    ),
    approach: [
      c(
        "关联用户、商品、会话、行为、订单和评论六类数据，练习多表分析与质量校验。",
        "Join six datasets covering users, products, sessions, interactions, purchases and reviews to practice analysis and quality checks.",
      ),
      c(
        "依次练习漏斗、RFM、同期群留存、统计检验，再进入分类、聚类与推荐。",
        "Explore funnels, RFM, cohort retention and statistical testing before classification, clustering and recommendations.",
      ),
    ],
    contribution: null,
    outcome: c(
      "产物是可运行的 Python 练习与分析流程；这是公开数据学习项目，不作为真实业务增长业绩。",
      "The outputs are runnable Python exercises and analytical workflows. This is a learning project, not a claim of commercial growth.",
    ),
    steps: [
      c("数据清洗", "Clean"),
      c("业务分析", "Analyze"),
      c("特征工程", "Engineer"),
      c("建模评估", "Model & evaluate"),
    ],
  },
  {
    slug: "Ultimate-data-science-take-home-challenge-sample",
    title: "Ultimate Data Challenge",
    subtitle: c(
      "从需求节律，走向留存问题。",
      "From demand patterns to retention.",
    ),
    category: "data",
    character: 2,
    color: "peach",
    tags: ["Jupyter", "EDA", "Experiment design"],
    kind: c("Fork · 学习案例", "Fork · Learning case"),
    intro: c(
      "收藏与学习的数据科学面试案例，涉及登录行为分析、实验指标设计与用户留存预测。",
      "A forked data-science interview case for study, covering login activity, experimental metrics and rider-retention prediction.",
    ),
    problem: c(
      "同一业务场景可以同时涉及描述性分析、因果实验与预测建模，需要区分每类方法回答的问题。",
      "One business scenario can involve descriptive analysis, causal experiments and predictive modeling. Each answers a different question.",
    ),
    approach: [
      c(
        "案例按 15 分钟聚合模拟登录记录，观察需求的日内与周期性变化。",
        "The case aggregates simulated logins into 15-minute intervals to study daily and periodic demand.",
      ),
      c(
        "讨论通行费补贴实验，并通过用户行为特征研究留存预测。",
        "It explores a toll-reimbursement experiment and rider-retention prediction from behavioral features.",
      ),
    ],
    contribution: c(
      "此仓库为 Fork 学习材料；原始案例与分析归原作者所有。个人增量分析暂未补充。",
      "This repository is forked learning material. The original case and analysis belong to their authors; personal extensions have not yet been documented.",
    ),
    outcome: c(
      "用于练习从问题定义、指标选择到建模评估的完整思路，不把原作者分析作为个人原创成果。",
      "A study resource for problem framing, metric selection and model evaluation, with attribution retained for the original analysis.",
    ),
    steps: [
      c("需求分析", "Explore demand"),
      c("实验设计", "Design experiment"),
      c("留存预测", "Predict retention"),
    ],
  },
  {
    slug: "DSA_LearningMaterial",
    title: "Algorithm Field Notes",
    subtitle: c(
      "把基础，一点一点扎稳。",
      "Building foundations, one idea at a time.",
    ),
    category: "data",
    character: 10,
    color: "green",
    tags: ["Python", "Data structures", "Algorithms"],
    kind: c("学习资料库", "Learning library"),
    intro: c(
      "个人数据结构与算法学习资料，按主题组织 Python 文件，从基础结构延伸到图论与动态规划。",
      "A personal data-structures and algorithms library, organized as Python modules from fundamental structures to graphs and dynamic programming.",
    ),
    problem: c(
      "掌握工具之外，也需要理解数据如何组织、问题如何拆解，以及算法的效率边界。",
      "Beyond using tools, it helps to understand how data is organized, how problems decompose and where computational limits arise.",
    ),
    approach: [
      c(
        "围绕数组、链表、栈、队列、哈希表、树与图建立学习路线。",
        "Build a learning path through arrays, linked lists, stacks, queues, hash tables, trees and graphs.",
      ),
      c(
        "进一步覆盖排序、二分查找、动态规划、贪心、回溯与分治。",
        "Continue with sorting, binary search, dynamic programming, greedy methods, backtracking and divide-and-conquer.",
      ),
    ],
    contribution: null,
    outcome: c(
      "以结构化主题目录呈现学习积累，源文件可在 GitHub 阅读。",
      "A topic-based record of learning, with source files available on GitHub.",
    ),
    steps: [
      c("基础结构", "Structures"),
      c("树与图", "Trees & graphs"),
      c("算法策略", "Strategies"),
    ],
  },
  {
    slug: "aixiachuang_official_site",
    title: "Ai Xia Chuang",
    subtitle: c(
      "让创意相遇，让社区被看见。",
      "A place for ideas and people to meet.",
    ),
    category: "web",
    character: 11,
    color: "pink",
    tags: ["HTML", "Web", "Hackathon"],
    kind: c("黑客松官网", "Hackathon website"),
    intro: c(
      "爱厦创黑客松官方网站项目，将活动的对外展示落在一个可访问的 Web 页面上。",
      "The Ai Xia Chuang hackathon website project, providing a web presence for the community event.",
    ),
    problem: c(
      "社区活动需要一个统一的线上入口，让访客可以了解活动并建立第一印象。",
      "Community events need a shared online destination where visitors can discover the event and form a first impression.",
    ),
    approach: [
      c(
        "仓库以 HTML 页面为主体，并包含活动相关视觉素材。",
        "The repository is centered on an HTML page and supporting event artwork.",
      ),
      c(
        "网站案例关注活动信息的呈现；具体设计决策与个人交付记录将随材料补充。",
        "This case focuses on the event’s web presence; design decisions and individual deliverables will be added with supporting material.",
      ),
    ],
    contribution: null,
    outcome: c(
      "公开代码可在 GitHub 查阅；暂不展示未经核实的报名人数或访问量。",
      "Public source is available on GitHub. Registration and traffic metrics have not been published.",
    ),
    steps: [
      c("社区活动", "Community"),
      c("信息呈现", "Information"),
      c("线上入口", "Web presence"),
    ],
  },
];
export const projects = allProjects.filter(p => ['my-screenwriter','William','The-Sixth-ELement','aixiachuang_official_site'].includes(p.slug));
export const repoUrl = (p: Project) =>
  `https://github.com/ashley20040126/${p.slug}`;
