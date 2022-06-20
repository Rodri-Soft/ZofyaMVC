using ZofyaMVC.ModelValidations;

public class AuxiliaryWishList
{
  public int IDWishList { get; set; }
  public string Name { get; set; } = null!;
  public int IDUser { get; set; }
  public List<AuxiliaryItemShoppingCart> AuxiliaryItemShoppingCart { get; set; } = null!;
}
