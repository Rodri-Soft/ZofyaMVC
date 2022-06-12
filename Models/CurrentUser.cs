using System;
using System.Collections.Generic;

namespace ZofyaMVC.Models
{
    public static class CurrentUser
    {

        private static string UserEmail;


        public static void SetUserEmail(string Email)
        {
            UserEmail = Email;            
        }

        public static string GetUserEmail()
        {
            return UserEmail;
        }               
        
    }
}
