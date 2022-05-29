using System;
using System.Collections.Generic;

namespace ZofyaMVC.Models
{
    public partial class Item_Color
    {
        public string SKU { get; set; } = null!;
        public string Color { get; set; } = null!;

        public virtual Item SKUNavigation { get; set; } = null!;
    }
}
