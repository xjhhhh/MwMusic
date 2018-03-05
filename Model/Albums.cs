using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 专辑表
    /// </summary>
    public class Albums
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 歌手
        /// </summary>
        public string Singer { get; set; }
        /// <summary>
        /// 发行时间
        /// </summary>
        public DateTime ReleaseTime { get; set; }
        /// <summary>
        /// 风格
        /// </summary>
        public string Style { get; set; }
        /// <summary>
        /// 语种
        /// </summary>
        public string Language { get; set; }
        /// <summary>
        /// 介绍
        /// </summary>
        public string Profile { get; set; }
    }
}