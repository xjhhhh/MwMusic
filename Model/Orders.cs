using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 订单表
    /// </summary>
    public class Orders
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 交易状态
        /// </summary>
        public string Transactionstatus { get; set; }
        /// <summary>
        /// 交易日期
        /// </summary>
        public DateTime TransactionDate { get; set; }
        /// <summary>
        /// 商品
        /// </summary>
        public string Product { get; set; }
        /// <summary>
        /// 用户编号
        /// </summary>
        public int UserId { get; set; }
    }
}