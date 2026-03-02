using Microsoft.Azure.Cosmos.Serialization.HybridRow.Layouts;
using PMS_WindowsApp.Properties;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PMS_WindowsApp
{
    public partial class frmGateSelect : Form
    {
        Settings settings = Settings.Default;
        string GateMode = "IN";
        public frmGateSelect()
        {
            InitializeComponent();
            GateMode = settings.GateMode;
        }

        private void frmGateSelect_Load(object sender, EventArgs e)
        {
            ToggleInOut(GateMode);
            nudGateNumber.Value = settings.GateNumber;
        }
        private void ToggleInOut(string mode = "in")
        {
            if (mode.ToUpper() == "IN")
            {
                btnIn.BackColor = SystemColors.ControlDark;
                btnOut.BackColor = SystemColors.Control;
                GateMode = "IN";
            }
            else
            {
                btnIn.BackColor = SystemColors.Control;
                btnOut.BackColor = SystemColors.ControlDark;
                GateMode = "OUT";
            }
        }

        private void btnOk_Click(object sender, EventArgs e)
        {
            settings.GateMode = GateMode;
            settings.GateNumber = int.Parse(nudGateNumber.Value.ToString());
            settings.Save();
            this.Close();
        }

        private void btnOut_Click(object sender, EventArgs e)
        {
            ToggleInOut("OUT");
        }

        private void btnIn_Click(object sender, EventArgs e)
        {
            ToggleInOut("IN");
        }
    }
}
