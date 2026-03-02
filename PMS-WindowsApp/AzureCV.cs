using System;
using System.Collections.Generic;
//using System.IO.Pipelines;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;
using System.Collections.Generic;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json; // using Newtonsoft.Json;
using System.Linq;  //using Newtonsoft.Json.Linq;
using System.Threading;
using System.Linq;
using System.Diagnostics;

namespace PMS_WindowsApp
{
    internal class AzureCV
    {
        // Add your Computer Vision subscription key and endpoint
        static string subscriptionKey = "";   //"YOUR_KEY_1";
        static string endpoint = "";  // "YOUR_Endpoint";

        public async Task<string> Process(Stream imageStream)
        {
            try
            {
                ComputerVisionClient client = Authenticate(endpoint, subscriptionKey);
                Debug.WriteLine("Authenticates Success..");
                // Extract text (OCR) from a URL image using the Read API
                return await ReadFileStream(client, imageStream);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ComputerVisionClient Authenticate(string endpoint, string key)
        {
            ComputerVisionClient client =
              new ComputerVisionClient(new ApiKeyServiceClientCredentials(key))
              { Endpoint = endpoint };
            return client;
        }

        private async Task<string> ReadFileStream(ComputerVisionClient client, Stream imageStream)
        {
            Debug.WriteLine("Reading Image Stream");
            string image_text = "";


            using var cts = new CancellationTokenSource();
            cts.CancelAfter(TimeSpan.FromSeconds(10)); // Cancel after 10 seconds

            try
            {
                // Read text from URL
                
                var textHeaders = await client.ReadInStreamAsync(imageStream, cancellationToken: cts.Token).ConfigureAwait(false);
                // After the request, get the operation location (operation ID)
                string operationLocation = textHeaders.OperationLocation;

                // Retrieve the URI where the extracted text will be stored from the Operation-Location header.
                // We only need the ID and not the full URL
                const int numberOfCharsInOperationId = 36;
                string operationId = operationLocation.Substring(operationLocation.Length - numberOfCharsInOperationId);

                Debug.WriteLine("Waiting for CV ReadFileStream");
                // Extract the text
                ReadOperationResult results;
                do
                {
                    results = await client.GetReadResultAsync(Guid.Parse(operationId), cancellationToken: cts.Token).ConfigureAwait(false);
                    Debug.WriteLine(results.Status.ToString());
                }
                while ((results.Status == OperationStatusCodes.Running ||
                    results.Status == OperationStatusCodes.NotStarted));
                Debug.WriteLine("Completed....Waiting for CV ReadFileStream");

                // Display the found text.
                var textUrlFileResults = results.AnalyzeResult.ReadResults;
                int biggestArea = 0;
                foreach (ReadResult page in textUrlFileResults)
                {
                    foreach (Line line in page.Lines)
                    {
                        int area = CalculateArea(line.BoundingBox);
                        if (area > biggestArea)
                        {
                            biggestArea = area;
                            image_text = line.Text;
                        }
                    }
                }
                Debug.WriteLine("Azure CV Completed");
                return image_text;
            }
            catch (TaskCanceledException)
            {
                Debug.WriteLine("Operation timesout...");
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }
            finally
            {
                
            }
            return "";
        }

        public record Point
        {
            public int X { get; set; }
            public int Y { get; set; }

        }
        private int CalculateArea(IList<double?> boundingBox)
        {
            if (boundingBox == null)
            {
                return 0;
            }

            List<Point> points = new List<Point>();
            for (int i = 0; i < boundingBox.Count; i += 2)
            {
                points.Add(new Point { X = Convert.ToInt32(boundingBox[i]), Y = Convert.ToInt32(boundingBox[i + 1]) });
            }
            points.Add(points[0]);

            var area = Math.Abs(points.Take(points.Count - 1)
               .Select((p, i) => (points[i + 1].X - p.X) * (points[i + 1].Y + p.Y))
               .Sum() / 2);
            return area;
        }
    }
}
