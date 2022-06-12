using ZofyaMVC.Models;

namespace ZofyaMVC.Data
{
    public class DA_Customer
    {           

        public bool CustomerValidation(string email, string password)
        {

            using (ZofyaContext dbContext = new ZofyaContext())
            {
                bool emailExist = dbContext.Customers.Where(c => c.Email.Equals(email)).Count() > 0;

                if (!emailExist)
                {
                    return false;
                }

                bool customerExist = dbContext.Customers.Where(c => c.Email == email && c.Password == password).Count() > 0;                                 


                return customerExist;
            }
            
        }

        public Customer? FindCustomer(string email)
        {
            using (ZofyaContext dbContext = new ZofyaContext())
            {
                return dbContext.Customers.FirstOrDefault(c => c.Email.Equals(email));
            }
            
        }

        // public int WishListNumber(string id)
        // {            

        //     using (ZofyaContext dbContext = new ZofyaContext())
        //     {
        //         List<WishList> wishLists = (from wish in dbContext.WishLists
        //                     where wish.IDUser == Int32.Parse(id)
        //                     select wish).ToList();

        //         return wishLists.Count();
        //     }            

        // }

        public ShoppingCart GetUserShoppingCart(string idUser)
        {            

            using (ZofyaContext dbContext = new ZofyaContext())
            {
                ShoppingCart? shoppingCart = (from sc in dbContext.ShoppingCarts
                            where sc.IDUser == Int32.Parse(idUser)
                            select sc).FirstOrDefault();

                return shoppingCart;
            }            

        }

        public int GetShoppingCartProductsNumber(int idShoppingCart)
        {
            using (ZofyaContext dbContext = new ZofyaContext())
            {
                List<ItemShoppingCart> itemShoppingCarts = (from isc in dbContext.ItemShoppingCarts
                                              where isc.IDShoppingCart == idShoppingCart
                                              select isc).ToList();

                return itemShoppingCarts.Count();
            }
        }

    }
}
