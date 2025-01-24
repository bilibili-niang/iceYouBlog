// 文章基础类型
export interface MarkdownBase {
    title?: string // 文章名称
    content?: string // 文章内容
    states?: number // 文章的状态: 0草稿,1发布,2私密
    description?: string // 文章的描述
    praise?: string // 文章的点赞数量
    view?: string // 文章的浏览量
    audit?: string // 文章的审核状态: 1通过,0未通过
    tag1?: string // 文章的标签1
    tag2?: string // 文章的标签2
    tag3?: string // 文章的标签3
    source?: string // 文章来源
    url?: string // 文章链接
    headImg?: string // 文章自定义头图
    type?: string // 文章类型
    hasOriginal?: string // 是否有源头
    diggCount?: string // 点赞数量
    articleType?: string // 文章类型
    recommendLevel?: number // 文章置顶等级
}

// 创建文章请求参数
export interface CreateMarkdownParams extends MarkdownBase {
    states: number
    audit: string
    type: string
    hasOriginal: string
    diggCount: string
    articleType: string
    recommendLevel: number
}

// 更新文章请求参数
export interface UpdateMarkdownParams extends MarkdownBase {
    id: string // 文章ID
}

// 文章列表响应
export interface MarkdownListResponse {
    count: number
    rows: Array<MarkdownBase>
    page: number
    pageSize: number
}

// 文章浏览量响应项
export interface MarkdownViewItem {
    id: string // 文章ID
    title: string // 文章标题
    view: string // 浏览量
}