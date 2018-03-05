using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 歌单表
    /// </summary>
    public class Playlist
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 作者
        /// </summary>
        public Users User { get; set; }
        /// <summary>
        /// 简介
        /// </summary>
        public string Profile { get; set; }
        /// <summary>
        /// 风格
        /// </summary>
        public string style { get; set; }
    }
}