<%@ WebHandler Language="C#" Class="ChangeImg" %>

using System;
using System.Web;
using System.Collections.Generic;
using BLL;
using Model;
public class ChangeImg : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string img = context.Request["img"];
        string Id = context.Request["Id"];
        if (img != null)
        {
            int index = -1;
            List<ImgSrc> list = ImgSrcManager.GetImgs();
            int indexM = list.Count - 1;
            foreach (ImgSrc obj in list)
            {
                if (img == obj.img)
                    index = list.IndexOf(obj);
            }
            if (Id == "0")
            {
                index = index - 1;
                if (index == -1)
                    context.Response.Write(list[indexM].img + "," + indexM);
                else
                    context.Response.Write(list[index].img + "," + index);
            }
            else
            {
                index = index + 1;
                if (index > indexM)
                    context.Response.Write(list[0].img + ",0");
                else
                    context.Response.Write(list[index].img + "," + index);
            }
        }
        else
        {
            int length = ImgSrcManager.GetImgs().Count;
            context.Response.Write(length.ToString());
        }
    }


    public bool IsReusable {
        get {
            return false;
        }
    }


}