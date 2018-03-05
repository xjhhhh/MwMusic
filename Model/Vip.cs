using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 会员表
    /// </summary>
    public class Vip
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 成长值
        /// </summary>
        public int GrowthValue { get; set; }
        /// <summary>
        /// 用户编号
        /// </summary>
        public int UserId { get; set; }
    }
}
