using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Model;

namespace BLL
{
    public class ImgSrcManager
    {
        public static List<ImgSrc> GetImgs()
        {
            List<ImgSrc> list = new List<ImgSrc>()
            {

            new ImgSrc() { src="1",img="../images/13.jpg"},
            new ImgSrc() { src="2",img="../images/rw2.jpg"},
            new ImgSrc() { src="3",img="../images/5.jpg"}
            };
            return list;
        }
    }
}
