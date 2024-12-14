using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Core.Models.Payment
{
    public class VnpaySettings
    {
        public string TmnCode { get; set; }  // Thêm 'get; set;'
        public string HashSecret { get; set; }  // Thêm 'get; set;'
        public string BaseUrl { get; set; }  // Thêm 'get; set;'
        public string CallbackUrl { get; set; }  // Thêm 'get; set;'
    }
}
