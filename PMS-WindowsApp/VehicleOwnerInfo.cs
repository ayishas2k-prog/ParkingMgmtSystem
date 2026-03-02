using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS_WindowsApp
{
    public class VehicleOwnerInfo
    {

        public string id { get; set; } // for Cosmos DB unique id

        [Required]
        public string VehicleNumber { get; set; }

        public string OwnerName { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int Seats { get; set; }
        public string Location { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
    }

}
