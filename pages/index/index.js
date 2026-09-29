const supabase = require('../../utils/supabase-client.js')

Page({
  data: {
    courses: [],
    loading: true,
    errorMessage: ''
  },

  onLoad() {
    this.loadCourses()
  },

  async loadCourses() {
    // 避免重复请求
    if (this._requestPending) return
    this._requestPending = true

    this.setData({
      loading: true,
      errorMessage: ''
    })

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, course_code, course_name, credit, avg_score, review_count')
        .order('course_code', { ascending: true })

      if (error) throw error

      const courses = (data || []).map(course => ({
        ...course,
        review_count: Number(course.review_count) || 0,
        scoreText: Number(course.review_count) > 0
          && course.avg_score != null
          ? Number(course.avg_score).toFixed(1)
          : '暂无评分'
      }))

      this.setData({ courses })
      console.log('课程加载成功，共', courses.length, '门')
    } catch (error) {
      console.error('课程加载失败', error)

      this.setData({
        errorMessage: '课程加载失败，请检查网络后重试'
      })
    } finally {
      this._requestPending = false
      this.setData({ loading: false })
    }
  }
})
