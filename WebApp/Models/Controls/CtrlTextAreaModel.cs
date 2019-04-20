﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Controls
{
    public class CtrlTextAreaModel : CtrlBaseModel
    {
        public string Label { get; set; }
        public string CampoRequerido { get; set; }
        public string PlaceHolder { get; set; }
        public string Required { get; set; }
        public string MensajeValidacion { get; set; }


        public CtrlTextAreaModel()
        {
            ViewName = "";
        }      
    }
}