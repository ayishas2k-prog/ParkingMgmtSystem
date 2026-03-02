using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
//using LicensePlateRecognition;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;


namespace PMS_WindowsApp
{
    public partial class Form2 : Form
    {
        private VideoCapture capture;
        static bool ShowDetectedImages = true;
        String win1 = "Preview";

        public Form2()
        {
            InitializeComponent();
            capture = new VideoCapture();

        }

        private void Form2_Load(object sender, EventArgs e)
        {
            String win1 = "Test Window (Press any key to close)"; //The name of the window
            CvInvoke.NamedWindow(win1); //Create the window using the specific name
            using (Mat frame = new Mat())
            using (VideoCapture capture = new VideoCapture())

                while (CvInvoke.WaitKey(1) == -1)
                {
                    // Thread.Sleep(1000);
                    capture.Read(frame);
                    frame.Save("capture.jpg");
                    CvInvoke.Imshow(win1, frame);
                }

            Detect();
        }

        static void Detect()
        {
            // Load image
            Mat image = CvInvoke.Imread("capture.jpg");

            // Resize image to width 500, maintain aspect ratio
            double scale = 500.0 / image.Width;
            Size newSize = new Size(500, (int)(image.Height * scale));
            CvInvoke.Resize(image, image, newSize);

            // Show original image
            if (ShowDetectedImages) CvInvoke.Imshow("Original Image", image);

            // Convert to grayscale
            Mat grayImage = new Mat();
            CvInvoke.CvtColor(image, grayImage, ColorConversion.Bgr2Gray);
            if (ShowDetectedImages) CvInvoke.Imshow("Gray Image", grayImage);

            // Bilateral filter to smooth while keeping edges
            Mat smoothedGray = new Mat();
            CvInvoke.BilateralFilter(grayImage, smoothedGray, 11, 17, 17);
            if (ShowDetectedImages) CvInvoke.Imshow("Smoothed Image", smoothedGray);

            // Edge detection with Canny
            Mat edges = new Mat();
            CvInvoke.Canny(smoothedGray, edges, 170, 200);
            if (ShowDetectedImages) CvInvoke.Imshow("Edges", edges);

            // Find contours
            using (VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint())
            {
                CvInvoke.FindContours(edges, contours, null, RetrType.List, ChainApproxMethod.ChainApproxSimple);

                // Draw all contours for visualization
                Mat contouredImage = image.Clone();
                for (int i = 0; i < contours.Size; i++)
                {
                    CvInvoke.DrawContours(contouredImage, contours, i, new MCvScalar(0, 255, 0), 3);
                }
                if (ShowDetectedImages) CvInvoke.Imshow("All Contours", contouredImage);

                // Sort contours by area and take top 30
                var sortedContours = new VectorOfVectorOfPoint();
                var contourList = new System.Collections.Generic.List<(double area, VectorOfPoint contour)>();

                for (int i = 0; i < contours.Size; i++)
                {
                    double area = CvInvoke.ContourArea(contours[i]);
                    contourList.Add((area, contours[i]));
                }
                contourList.Sort((a, b) => b.area.CompareTo(a.area));
                contourList = contourList.GetRange(0, Math.Min(30, contourList.Count));

                foreach (var c in contourList)
                    sortedContours.Push(c.contour);

                // Draw top 30 contours
                Mat topContoursImage = image.Clone();
                for (int i = 0; i < sortedContours.Size; i++)
                {
                    CvInvoke.DrawContours(topContoursImage, sortedContours, i, new MCvScalar(0, 255, 0), 3);
                }
                if (ShowDetectedImages) CvInvoke.Imshow("Top 30 Contours", topContoursImage);

                // Identify the contour that likely represents the number plate
                VectorOfPoint plateContour = null;
                Mat croppedPlate = null;
                for (int i = 0; i < sortedContours.Size; i++)
                {
                    VectorOfPoint contour = sortedContours[i];

                    double perimeter = CvInvoke.ArcLength(contour, true);
                    VectorOfPoint approxCorners = new VectorOfPoint();
                    CvInvoke.ApproxPolyDP(contour, approxCorners, 0.02 * perimeter, true);

                    if (approxCorners.Size == 4) // Found a rectangle
                    {
                        plateContour = approxCorners;
                        Rectangle rect = CvInvoke.BoundingRectangle(contour);
                        croppedPlate = new Mat(image, rect);

                        // Save cropped plate image
                        CvInvoke.Imwrite("plate.png", croppedPlate);
                        break;
                    }
                }

                // Draw detected plate contour on original image
                if (plateContour != null)
                {
                    CvInvoke.DrawContours(image, new VectorOfVectorOfPoint(plateContour), -1, new MCvScalar(0, 255, 0), 3);
                    if (ShowDetectedImages) CvInvoke.Imshow("Detected Plate", image);

                    // Show cropped plate image
                    Mat plateImg = CvInvoke.Imread("plate.png");
                    if (ShowDetectedImages) CvInvoke.Imshow("Cropped Plate", plateImg);
                }
            }


        }
    }
}
