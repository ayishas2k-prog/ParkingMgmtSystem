using Emgu.CV;

namespace PMS_WindowsApp
{
    partial class frmMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>


        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            timer1 = new System.Windows.Forms.Timer(components);
            lblCapInstruction = new Label();
            pbPreview = new PictureBox();
            lblDateTime = new Label();
            chkAutoCapture = new CheckBox();
            chkUserAzureCV = new CheckBox();
            dgParkingData = new DataGridView();
            lblVehicleNumber = new Label();
            label3 = new Label();
            panel1 = new Panel();
            dgVehicleData = new DataGridView();
            btnChangeGate = new Button();
            lblGateInfo = new Label();
            tmrTimeDisplay = new System.Windows.Forms.Timer(components);
            tmrPreview = new System.Windows.Forms.Timer(components);
            ((System.ComponentModel.ISupportInitialize)pbPreview).BeginInit();
            ((System.ComponentModel.ISupportInitialize)dgParkingData).BeginInit();
            panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dgVehicleData).BeginInit();
            SuspendLayout();
            // 
            // timer1
            // 
            timer1.Enabled = true;
            timer1.Interval = 1000;
            timer1.Tick += timer1_Tick;
            // 
            // lblCapInstruction
            // 
            lblCapInstruction.AutoSize = true;
            lblCapInstruction.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCapInstruction.Location = new Point(15, 135);
            lblCapInstruction.Name = "lblCapInstruction";
            lblCapInstruction.Size = new Size(135, 21);
            lblCapInstruction.TabIndex = 0;
            lblCapInstruction.Text = "press C to capture";
            // 
            // pbPreview
            // 
            pbPreview.BorderStyle = BorderStyle.FixedSingle;
            pbPreview.Location = new Point(9, 128);
            pbPreview.Name = "pbPreview";
            pbPreview.Size = new Size(303, 205);
            pbPreview.SizeMode = PictureBoxSizeMode.StretchImage;
            pbPreview.TabIndex = 1;
            pbPreview.TabStop = false;
            // 
            // lblDateTime
            // 
            lblDateTime.Font = new Font("Segoe UI", 21.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDateTime.Location = new Point(9, 12);
            lblDateTime.Name = "lblDateTime";
            lblDateTime.Size = new Size(569, 40);
            lblDateTime.TabIndex = 0;
            lblDateTime.Text = "Date - Time";
            lblDateTime.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // chkAutoCapture
            // 
            chkAutoCapture.AutoSize = true;
            chkAutoCapture.Location = new Point(608, 73);
            chkAutoCapture.Name = "chkAutoCapture";
            chkAutoCapture.Size = new Size(97, 19);
            chkAutoCapture.TabIndex = 2;
            chkAutoCapture.Text = "Auto Capture";
            chkAutoCapture.UseVisualStyleBackColor = true;
            chkAutoCapture.CheckedChanged += chkAutoCapture_CheckedChanged;
            // 
            // chkUserAzureCV
            // 
            chkUserAzureCV.AutoSize = true;
            chkUserAzureCV.Location = new Point(608, 48);
            chkUserAzureCV.Name = "chkUserAzureCV";
            chkUserAzureCV.Size = new Size(148, 19);
            chkUserAzureCV.TabIndex = 2;
            chkUserAzureCV.Text = "Azure Computer Vision";
            chkUserAzureCV.UseVisualStyleBackColor = true;
            // 
            // dgParkingData
            // 
            dgParkingData.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgParkingData.Location = new Point(9, 339);
            dgParkingData.Name = "dgParkingData";
            dgParkingData.Size = new Size(744, 210);
            dgParkingData.TabIndex = 3;
            // 
            // lblVehicleNumber
            // 
            lblVehicleNumber.Font = new Font("Segoe UI", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblVehicleNumber.Location = new Point(12, 7);
            lblVehicleNumber.Name = "lblVehicleNumber";
            lblVehicleNumber.Size = new Size(423, 30);
            lblVehicleNumber.TabIndex = 0;
            lblVehicleNumber.Text = "Vehicle Number";
            lblVehicleNumber.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(376, 174);
            label3.Name = "label3";
            label3.Size = new Size(38, 15);
            label3.TabIndex = 4;
            label3.Text = "label3";
            // 
            // panel1
            // 
            panel1.BorderStyle = BorderStyle.FixedSingle;
            panel1.Controls.Add(dgVehicleData);
            panel1.Controls.Add(lblVehicleNumber);
            panel1.Location = new Point(318, 128);
            panel1.Name = "panel1";
            panel1.Size = new Size(438, 205);
            panel1.TabIndex = 5;
            // 
            // dgVehicleData
            // 
            dgVehicleData.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgVehicleData.ColumnHeadersVisible = false;
            dgVehicleData.Location = new Point(-1, 40);
            dgVehicleData.Name = "dgVehicleData";
            dgVehicleData.RowHeadersVisible = false;
            dgVehicleData.Size = new Size(436, 162);
            dgVehicleData.TabIndex = 1;
            // 
            // btnChangeGate
            // 
            btnChangeGate.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnChangeGate.Location = new Point(608, 12);
            btnChangeGate.Name = "btnChangeGate";
            btnChangeGate.Size = new Size(148, 30);
            btnChangeGate.TabIndex = 6;
            btnChangeGate.Text = "Change Gate";
            btnChangeGate.UseVisualStyleBackColor = true;
            btnChangeGate.Click += btnGateChange_Click;
            // 
            // lblGateInfo
            // 
            lblGateInfo.Font = new Font("Segoe UI", 21.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblGateInfo.Location = new Point(9, 73);
            lblGateInfo.Name = "lblGateInfo";
            lblGateInfo.Size = new Size(569, 40);
            lblGateInfo.TabIndex = 0;
            lblGateInfo.Text = "IN - GATE-1";
            lblGateInfo.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // tmrTimeDisplay
            // 
            tmrTimeDisplay.Enabled = true;
            tmrTimeDisplay.Interval = 30000;
            tmrTimeDisplay.Tick += tmrTimeDisplay_Tick;
            // 
            // tmrPreview
            // 
            tmrPreview.Enabled = true;
            tmrPreview.Interval = 500;
            tmrPreview.Tick += tmrPreview_Tick;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(768, 561);
            Controls.Add(btnChangeGate);
            Controls.Add(panel1);
            Controls.Add(label3);
            Controls.Add(dgParkingData);
            Controls.Add(chkUserAzureCV);
            Controls.Add(chkAutoCapture);
            Controls.Add(lblGateInfo);
            Controls.Add(lblDateTime);
            Controls.Add(lblCapInstruction);
            Controls.Add(pbPreview);
            KeyPreview = true;
            Name = "frmMain";
            Text = "Automated Vehicle Parking Register";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)pbPreview).EndInit();
            ((System.ComponentModel.ISupportInitialize)dgParkingData).EndInit();
            panel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)dgVehicleData).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private System.Windows.Forms.Timer timer1;
        private Label lblCapInstruction;
        private PictureBox pbPreview;
        private Label lblDateTime;
        private CheckBox chkAutoCapture;
        private CheckBox chkUserAzureCV;
        private DataGridView dgParkingData;
        private Label lblVehicleNumber;
        private Label label3;
        private Panel panel1;
        private DataGridView dgVehicleData;
        private Button btnChangeGate;
        private Label lblGateInfo;
        private System.Windows.Forms.Timer tmrTimeDisplay;
        private System.Windows.Forms.Timer tmrPreview;
    }
}
