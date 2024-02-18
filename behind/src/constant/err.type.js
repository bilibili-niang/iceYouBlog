//导出报错类型
module.exports = {
    FormatError: {
        code: '10001',
        message: '数据格式丢失',
        success: false,
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        success: false,
        result: ''
    },
    userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        success: false,
        result: ''
    },
    userParamsError: {
        code: '10005',
        message: '传参错误',
        success: false,
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码不匹配',
        success: false,
        result: ''
    },
    informationNotAllow: {
        code: '20001',
        message: '请好好填写表单',
        success: false,
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        success: false,
        result: ''
    },
    userFormateError: {
        code: '10006',
        message: '用户名或密码为空',
        success: false,
        result: ''
    },
    userUpdateError: {
        code: '10007',
        message: '用户名信息更新失败!',
        success: false,
        result: ''
    },
    //不同的模块报错返回不同的错误码,此处是101开头,表示token报错
    TokenExpiredError: {
        code: '10101',
        message: 'token过期',
        success: false,
        result: ''
    },
    TokenRefreshError: {
        code: '10102',
        message: 'token更新失败',
        success: false,
        result: ''
    },
    JsonWebTokenError: {
        code: '10101',
        message: 'token无效',
        success: false,
        result: ''
    },
    tokenNotExist: {
        code: '10102',
        message: 'token不存在或过期',
        success: false,
        result: ''
    },
    tokenRefreshError: {
        code: '10103',
        message: 'token更新失败',
        success: false,
        result: ''
    },
    userDontHaveArticle: {
        code: '30001',
        message: '该用户没有文章',
        success: false,
        result: ''
    },
    // 新建文章数据验证不通过,以4开头
    formDataNotAllow: {
        code: '40001',
        message: '数据非法!',
        success: false,
        result: ''
    },
    articleOperateError: {
        code: '40002',
        message: '文章操作传参错误!',
        success: false,
        result: ''
    },
    // 关于文章的,用5开头
    notExistFile: {
        code: '50001',
        message: '文章不存在或已被删除',
        success: false,
        result: ''
    },
    // 关于搜索的,以6开头
    searchKeyWordNotExist: {
        code: '60001',
        message: '搜索关键字不存在',
        success: false,
        result: ''
    },
    // codeClips相关操作,7开头
    codeClipsDelError: {
        code: '70001',
        message: '删除id不存在',
        success: false,
        result: ''
    },
    codeClipsIdError: {
        code: '70002',
        message: '查询id不存在',
        success: false,
        result: ''
    },
    // admin相关操作,8开头
    adminError: {
        code: '80001',
        message: '不是admin用户,无法操作',
        success: false,
        result: ''
    },
    // 关于tag的报错:
    tagNotExist: {
        code: '90001',
        message: '缺少tags参数',
        success: false,
        result: ''
    },
    // 关于评论报错
    commentNotAllow: {
        code: '10001',
        message: '缺少必要参数',
        success: false,
        result: ''
    },
    commentIdParameterNotAllow: {
        code: '10002',
        message: 'id参数错误',
        success: false,
        result: ''
    },
    // 关于note的报错,以11开头
    noteParamsNotAllow: {
        code: '11001',
        message: "note操作传参错误",
        success: false,
        result: ''
    },
    noteAuthNotAllow: {
        code: '11002',
        message: "note操作权不够",
        success: false,
        result: ''
    },
// 关于评论相关
    commentError: {
        code: '113001',
        message: '评论错误',
        success: false,
        result: ''
    },
    commentUserError:{
        code: '113002',
        message: '评论用户错误',
        success: false,
        result: ''
    }

}
