const { createClient } = require('./supabase.js')
// 下面两行替换成你自己Supabase项目的信息
const supabaseUrl = "https://sncegfouhzzeatxjeawp.supabase.co";
const supabaseKey = "sb_publishable_i8wSaY7mzc0MmJ4r70TnsA_ChOsFICV";
const supabase = createClient(supabaseUrl, supabaseKey)
module.exports = supabase
