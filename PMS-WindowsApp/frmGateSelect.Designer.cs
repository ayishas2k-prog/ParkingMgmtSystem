namespace PMS_WindowsApp
{
    partial class frmGateSelect
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            btnIn = new Button();
            btnOut = new Button();
            nudGateNumber = new NumericUpDown();
            btnOk = new Button();
            ((System.ComponentModel.ISupportInitialize)nudGateNumber).BeginInit();
            SuspendLayout();
            // 
            // btnIn
            // 
            btnIn.BackColor = SystemColors.ControlDark;
            btnIn.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold);
            btnIn.Location = new Point(17, 39);
            btnIn.Name = "btnIn";
            btnIn.Size = new Size(75, 30);
            btnIn.TabIndex = 0;
            btnIn.Text = "IN";
            btnIn.UseVisualStyleBackColor = false;
            btnIn.Click += btnIn_Click;
            // 
            // btnOut
            // 
            btnOut.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold);
            btnOut.Location = new Point(118, 39);
            btnOut.Name = "btnOut";
            btnOut.Size = new Size(75, 30);
            btnOut.TabIndex = 0;
            btnOut.Text = "OUT";
            btnOut.UseVisualStyleBackColor = true;
            btnOut.Click += btnOut_Click;
            // 
            // nudGateNumber
            // 
            nudGateNumber.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            nudGateNumber.Location = new Point(62, 91);
            nudGateNumber.Maximum = new decimal(new int[] { 10, 0, 0, 0 });
            nudGateNumber.Minimum = new decimal(new int[] { 1, 0, 0, 0 });
            nudGateNumber.Name = "nudGateNumber";
            nudGateNumber.Size = new Size(91, 25);
            nudGateNumber.TabIndex = 1;
            nudGateNumber.TextAlign = HorizontalAlignment.Center;
            nudGateNumber.Value = new decimal(new int[] { 1, 0, 0, 0 });
            // 
            // btnOk
            // 
            btnOk.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold);
            btnOk.Location = new Point(62, 140);
            btnOk.Name = "btnOk";
            btnOk.Size = new Size(91, 30);
            btnOk.TabIndex = 0;
            btnOk.Text = "OK";
            btnOk.UseVisualStyleBackColor = true;
            btnOk.Click += btnOk_Click;
            // 
            // frmGateSelect
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(218, 182);
            Controls.Add(nudGateNumber);
            Controls.Add(btnOut);
            Controls.Add(btnOk);
            Controls.Add(btnIn);
            FormBorderStyle = FormBorderStyle.FixedDialog;
            KeyPreview = true;
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "frmGateSelect";
            Text = "Gate Select";
            Load += frmGateSelect_Load;
            ((System.ComponentModel.ISupportInitialize)nudGateNumber).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private Button btnIn;
        private Button btnOut;
        private NumericUpDown nudGateNumber;
        private Button btnOk;
    }
}