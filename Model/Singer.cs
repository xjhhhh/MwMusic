using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 歌手表
    /// </summary>
    public class Singer
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
        /// 艺名
        /// </summary>
        public string EName { get; set; }
        /// <summary>
        /// 风格
        /// </summary>
        public string Style { get; set; }
        /// <summary>
        /// 国籍
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// 代表作品
        /// </summary>
        public string RepresentativeWorks { get; set; }
        /// <summary>
        /// 简介
        /// </summary>
        public string Profile { get; set; }
    }
}
