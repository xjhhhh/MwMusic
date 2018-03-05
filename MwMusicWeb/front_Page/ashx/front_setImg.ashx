<%@ WebHandler Language="C#" Class="setImg" %>

using System;
using System.Web;
using BLL;
using Model;
public class setImg : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string imgIndex = context.Request["Index"];
        if (imgIndex != null)
            context.Response.Write(ImgSrcManager.GetImgs()[Convert.ToInt32(imgIndex)].img);
        else
            context.Response.Write(ImgSrcManager.GetImgs()[0].img);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}