using Emgu.CV;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using System.Drawing.Imaging;
using System.Diagnostics;
//using LicensePlateRecognition;

using Tesseract;
using Emgu.CV.XFeatures2D;
using System.Net.NetworkInformation;
using System.Security.Policy;

namespace PMS_WindowsApp
{
    internal class ImageCapture : IDisposable
    {

        private VideoCapture _capture;
        private Mat? _mat;
        private Mat? _numPlateImage;
        private Mat? _croppedNumPlateImage;
        private bool ShowDetectedImages = false;

        public ImageCapture()
        {
            _capture = new VideoCapture();
        }

        public void Dispose()
        {
            _capture.Dispose();
        }

        //public string GetLicensePlateText()
        //{
        //    string output = "";
        //    string path = Directory.GetCurrentDirectory();

        //    LicensePlateDetector lp = new LicensePlateDetector(@"C:\Users\mikhi\source\repos\NumPlateCapture\tessdata-main\");
        //    //var a = lp.DetectLicensePlate(_numPlateImage, null, null, null);
        //    //if (a != null && a.Count > 0)
        //    //{
        //    //    foreach (var item in a)
        //    //    {
        //    //        output += item + " >> ";
        //    //    }
        //    //    return output;
        //    //}

        //    output = lp.GetStrings(_croppedNumPlateImage);

        //    Debug.Print(output);
        //    return "";
        //}

      
        private void GrabImage()
        {
            Debug.WriteLine("Grab Image...");
            _mat = new Mat();
            _capture.Read(_mat);
            return;
        }

        public Bitmap getPreviewImage()
        {
            GrabImage();
            return _mat.ToBitmap(false);
        }

        public Bitmap? GetOriginalImage()
        {
            Debug.WriteLine("Get Original Image");
            if (_mat == null)
                return null;

            return _mat.ToBitmap();
        }
        public Bitmap GetNumPlateImage()
        {
            Debug.WriteLine("Get Numbplate Image");
            return _numPlateImage.ToBitmap();
        }
        public Bitmap? GetNumPlateCroppedImage()
        {
            Debug.WriteLine("Get NumplateCroppedImage");
            if (_croppedNumPlateImage != null)
            {
                return _croppedNumPlateImage.ToBitmap();
            }

            return null;

        }

        public bool IsNumPlateExists()
        {
            GrabImage();
            _croppedNumPlateImage = null;
            _numPlateImage = null;

            // Load image
            
            Mat image = _mat.Clone();

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

                        //ensure rect has atleast 30 by 30 
                        if (rect.Height > 30 && rect.Width > 30)
                        {
                            _numPlateImage = _mat.Clone(); // Original Image
                            croppedPlate = new Mat(image, rect); //Processed and Cropped image

                            // Save cropped plate image
                            CvInvoke.Imwrite(PlateInformation.ImagePlateFileName, croppedPlate);

                            // Save Original Image
                            CvInvoke.Imwrite(PlateInformation.ImageOriginalFileName, _mat);

                            _croppedNumPlateImage = croppedPlate.Clone();

                            // Draw detected plate contour on original image
                            if (plateContour != null)
                            {
                                CvInvoke.DrawContours(image, new VectorOfVectorOfPoint(plateContour), -1, new MCvScalar(0, 255, 0), 3);
                                if (ShowDetectedImages) CvInvoke.Imshow("Detected Plate", image);

                                // Show cropped plate image
                                //Mat plateImg = CvInvoke.Imread("plate.png");
                                //if (ShowDetectedImages) CvInvoke.Imshow("Cropped Plate", plateImg);
                            }
                            Debug.WriteLine("Plate Detected...");
                            return true;
                        }
                    }
                }

                Debug.WriteLine("Plate Not Detected...");
                return false;
            }

        }
    }
}
