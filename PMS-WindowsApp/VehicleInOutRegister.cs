using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace PMS_WindowsApp
{
    public class VehicleInOutRegister
    {

        public string id { get; set; }      // for Cosmos DB unique id

        [Required]
        public DateTime InTime { get; set; }

        public DateTime? OutTime { get; set; } = null;

        [Required]
        public string VehicleNumber { get; set; }

        public string VehicleInImage { get; set; }  = string.Empty;

        public string VehicleOutImage { get; set; } = string.Empty;

        public string InGate { get; set; } = string.Empty;

        public string OutGate { get; set; } = string.Empty;

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime Updated { get; set; } = DateTime.Now;

        public TimeSpan? Duration => OutTime.HasValue ? OutTime.Value - InTime : (TimeSpan?)null;
        public decimal? Cost { get; set; }

        public VehicleInOutRegister() { }

        public static List<VehicleInOutRegister>? LoadTestData()
        {
            string data = @"
            [
  {
                ""InTime"": ""2025-10-11T09:00:00"",
    ""VehicleNumber"": ""TN01AB1234"",
    ""VehicleInImage"": """" 
  },
  {
                ""InTime"": ""2025-10-11T10:15:00"",
    ""VehicleNumber"": ""DL02CD5678"",
    ""VehicleInImage"": """" 
  }
]
        ";

            return JsonSerializer.Deserialize<List<VehicleInOutRegister>>(data);


        }
    }
}
