using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using System.Configuration;
using System.Diagnostics;
using System.Drawing.Imaging;

using Microsoft.Extensions.Configuration;
using Emgu.TF;
using System.Text.RegularExpressions;
using PMS_WindowsApp.Properties;
using System.Text;

namespace PMS_WindowsApp
{
    public partial class frmMain : Form
    {
        static bool ShowDetectedImages = false;
      //  String win1 = "Preview";

        ImageCapture cp;
        private readonly Settings _settings = Settings.Default;
        private readonly CosmosDbService _dbService;

        private Bitmap? _imageOriginal;

        public frmMain()
        {
            InitializeComponent();
            initDataGrids();
            this.KeyUp += FrmMain_KeyUp;

            _dbService = new CosmosDbService();
            cp = new ImageCapture();
            timer1.Enabled = false;

        }
        private void initDataGrids()
        {

            dgParkingData.AutoGenerateColumns = false;

            // Create columns manually
            dgParkingData.Columns.Add(new DataGridViewTextBoxColumn
            {
                DataPropertyName = "InTime",
                HeaderText = "In Time"
            });

            dgParkingData.Columns.Add(new DataGridViewTextBoxColumn
            {
                DataPropertyName = "InGate",
                HeaderText = "In Gate",
            });

            dgParkingData.Columns.Add(new DataGridViewTextBoxColumn
            {
                DataPropertyName = "VehicleNumber",
                HeaderText = "Vehicle Number"
            });
            dgParkingData.Columns.Add(new DataGridViewImageColumn
            {
                DataPropertyName = "VehicleImage",
                HeaderText = "Vehicle Image",
                ImageLayout = DataGridViewImageCellLayout.Zoom
            });

            dgVehicleData.AutoGenerateColumns = false;

            dgVehicleData.Columns.Add(new DataGridViewTextBoxColumn
            {
                DataPropertyName = "Key"
            });
            dgVehicleData.Columns.Add(new DataGridViewTextBoxColumn
            {
                DataPropertyName = "Value"
            });


        }

        private void LoadParkingData()
        {
            // var vRegister = VehicleInOutRegister.LoadTestData();

            var vRegister = _dbService.GetLast10VehicleInOutAsync().GetAwaiter().GetResult();
            // Convert base64 image to Image object for display
            var displayList = new List<dynamic>();
            foreach (var v in vRegister)
            {
                Image? vehicleImg = null;
                if (!string.IsNullOrEmpty(v.VehicleInImage))
                {
                    try
                    {
                        byte[] imageBytes = Convert.FromBase64String(v.VehicleInImage);
                        using (var ms = new MemoryStream(imageBytes))
                            vehicleImg = Image.FromStream(ms);
                    }
                    catch { }
                }
                displayList.Add(new
                {
                    v.InTime,
                    v.InGate,
                    v.VehicleNumber,
                    VehicleImage = vehicleImg
                });
                
            }

            dgParkingData.DataSource = displayList;
        }

        private void displayVehicleData(VehicleInOutRegister reg)
        {
            dgVehicleData.Rows.Clear();

            //dgVehicleData.Rows.Add(new {Key="Vehicle Number",Value=reg.VehicleNumber});
            dgVehicleData.Rows.Add(new { Key = "In Time", Value = reg.InTime });
            dgVehicleData.Rows.Add(new { Key = "In Gate", Value = reg.InGate });
            dgVehicleData.Rows.Add(new { Key = "Out Time", Value = reg.OutTime });
            dgVehicleData.Rows.Add(new { Key = "Out Gate", Value = reg.OutGate });
            dgVehicleData.Rows.Add(new { Key = "Duration", Value = reg.Duration });
            dgVehicleData.Rows.Add(new { Key = "Cost", Value = reg.Cost });
            dgVehicleData.Rows.Add(new { Key = "Subscription", Value = reg.Cost });
            dgVehicleData.Rows.Add(new { Key = "Expiry Date", Value = reg.Cost });

        }
        private void FrmMain_KeyUp(object? sender, KeyEventArgs e)
        {
            if (e.KeyData == Keys.C)
            {
                CheckTimer(false);
                var reg = ProcessVehicleInfo().GetAwaiter().GetResult();
                if (reg != null)
                    displayVehicleData(reg);

                CheckTimer(true);
            }
        }

        private void CheckTimer(bool enabled)
        {
            if (chkAutoCapture.Checked)
            {
                timer1.Enabled = enabled;
                tmrPreview.Enabled = false;
            }
            else
            {
                tmrPreview.Enabled = enabled;
                timer1.Enabled = false;
            }
        }

        private async Task<VehicleInOutRegister?> ProcessVehicleInfo()
        {
            var txt = await CaptureVehicleNumber().ConfigureAwait(false);
            //var txt = "PB10AA1234";  // test

            if (!string.IsNullOrEmpty(txt))
            {
                txt = ValidateVehicleNumber(txt);
            }
            try
            {
                if (!string.IsNullOrEmpty(txt))
                {
                    return await SaveVehicleNumber(txt).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return null;
        }
        protected override void Dispose(bool disposing)
        {

            if (disposing && (components != null))
            {
                components.Dispose();

                cp.Dispose();
            }
            base.Dispose(disposing);

        }
        private void Form1_Load(object sender, EventArgs e)
        {
            showGateInfo();
            LoadParkingData();
        }

        private string? ValidateVehicleNumber(string? text)
        {
            if (!string.IsNullOrEmpty(text))
            {
                // Validate Indian Vehicle Number Format.
                //https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_India#Permanent_registration_format

                text = text.ToUpper();
                List<string> patterns = new List<string>();
                patterns.Add(_settings.VehicleNumberPattern1);
                patterns.Add(_settings.VehicleNumberPattern2);
                patterns.Add(_settings.VehicleNumberPattern3);
                string vehicleNumber = "";
                foreach (var pattern in patterns)
                {
                    if (!string.IsNullOrEmpty(pattern))
                    {
                        MatchCollection matches = Regex.Matches(text, pattern);
                        if (matches.Count > 0)
                        {
                            vehicleNumber = matches[0].Value;
                            break;
                        }
                    }
                }
            }
            return text;
        }

        private async Task<VehicleInOutRegister?> SaveVehicleNumber(string vehicleNumber)
        {
            if (string.IsNullOrEmpty(vehicleNumber))
                return null;

            var register = await _dbService.GetLatestVehicleInOutRecordAsync(vehicleNumber).ConfigureAwait(false);
            if (register != null)
            {
                // Record already exists  and hence update if the GateMode is OUT
                if (_settings.GateMode == "OUT")
                {
                    register.OutGate = _settings.GateNumber.ToString();
                    register.OutTime = DateTime.Now;
                    register = CalculateParkingCost(register);

                    await _dbService.ModifyVehicleInOutAsync(register.id, register).ConfigureAwait(false);
                }
                else
                {
                    // Record already exists and dont make any changes to the register.
                }
            }
            else
            {
                // Record not found, create new record if the Gate Mode is IN
                if (_settings.GateMode == "IN")
                {
                    register = new VehicleInOutRegister();
                    register.id = Guid.NewGuid().ToString();
                    register.VehicleNumber = vehicleNumber;
                    register.InGate = _settings.GateNumber.ToString();
                    register.InTime = DateTime.Now;
                    register.VehicleInImage = GetBitmap2Base64(_imageOriginal);
                    //register.VehicleInImage =

                    await _dbService.SaveVehicleInOutAsync(register);
                }
            }
            return register;

        }

        private string GetBitmap2Base64(Bitmap bitmap)
        {
            if (bitmap == null)
                return "";
            using (var stream = new MemoryStream())
            {
                bitmap.Save(stream,ImageFormat.Png);
                
                //eturn Encoding.UTF8.GetString(stream.ToArray());
                return Convert.ToBase64String(stream.ToArray());
            }
                
        }

        private VehicleInOutRegister CalculateParkingCost(VehicleInOutRegister register)
        {
            return register;
        }

        private async Task<string?> CaptureVehicleNumber()
        {
            Debug.WriteLine("Capturing Image");
            if (cp.IsNumPlateExists())
            {
                _imageOriginal = cp.GetOriginalImage();
                var img = cp.GetNumPlateCroppedImage();
                if (img != null)
                {

                    using (Stream stream = new MemoryStream())
                    {
                        img.Save(stream, ImageFormat.Png);
                        // read stream to a byte array

                        var bytes = new byte[stream.Length];
                        stream.Position = 0;
                        var tmp = await stream.ReadAsync(bytes).ConfigureAwait(false);
                        using (PlateInformation pi = new PlateInformation(stream))
                        {
                            var text = string.Empty;
                            if (chkUserAzureCV.Checked)
                            {

                            }
                            else
                            {
                                text = await pi.GetTesseractStringsFromStream().ConfigureAwait(false);
                                //text = await pi.GetTesseractStringsFromFile().ConfigureAwait(false);
                            }
                            return text?.ToUpper();
                        }

                    }

                }
            }
            return null;
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            CheckTimer(false);
            var reg = ProcessVehicleInfo().GetAwaiter().GetResult();
            if (reg != null)
                displayVehicleData(reg);

            CheckTimer(true);
        }

        //private async Task ReadText()
        //{
        //    AzureCV cv = new AzureCV();

        //    var stream = new MemoryStream(File.ReadAllBytes("capture121.jpg"));
        //    var r = await cv.Process(stream);
        //    stream.Close();
        //    stream.Dispose();
        //    lblDateTime.Text = r;
        //}

        private void chkAutoCapture_CheckedChanged(object sender, EventArgs e)
        {
            CheckTimer(chkAutoCapture.Checked);
            if (chkAutoCapture.Checked)
            {
                pbPreview.Image = null;
                tmrPreview.Enabled = false;
                lblCapInstruction.Visible = false;
            }
            else
            {
                tmrPreview.Enabled = true; 
                lblCapInstruction.Visible = true;
            }
        }

        private void btnGateChange_Click(object sender, EventArgs e)
        {
            frmGateSelect frm = new frmGateSelect();
            frm.ShowDialog();
            showGateInfo();

        }

        private void showGateInfo()
        {
            lblGateInfo.Text = "Gate : " + _settings.GateNumber.ToString() + " " + _settings.GateMode.ToString();
        }
        private void tmrTimeDisplay_Tick(object sender, EventArgs e)
        {
            lblDateTime.Text = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
        }

        private void tmrPreview_Tick(object sender, EventArgs e)
        {
            tmrPreview.Enabled = false;
            pbPreview.Image = cp.getPreviewImage();
            tmrPreview.Enabled = true;
        }
    }
}
