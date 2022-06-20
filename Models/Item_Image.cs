﻿using System;
using System.Collections.Generic;

namespace ZofyaMVC.Models
{
    public partial class Item_Image
    {
        public int IDItem_Image { get; set; }
        public string SKU { get; set; } = null!;
        public string ImageURL { get; set; } = null!;

        public virtual Item SKUNavigation { get; set; } = null!;
    }
}
