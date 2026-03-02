using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Tesseract;

namespace PMS_WindowsApp
{
    internal class PlateInformation : IDisposable
    {
        public const string ImageOriginalFileName = "capture_org.jpg";
        public const string ImagePlateFileName = "capture_pnl.jpg";

        private readonly Stream? _stream;
        public PlateInformation()
        {
            _stream = null;
        }

        public PlateInformation(Stream imageStream) {
        _stream = imageStream;
        }

        public async Task<string?> GetTesseractStringsFromFile()
        {
            Func<Task<string?>> task = async () =>
            {
                try
                {
                    using (var engine = new TesseractEngine(@"C:\Users\mikhi\source\repos\NumPlateCapture\tessdata-main\",
                "eng", EngineMode.TesseractAndLstm))
                    {
                        using (var img = Pix.LoadFromFile(ImagePlateFileName))
                        {
                            using (var page = engine.Process(img))
                            {
                                string input = page.GetText();
                                string result = Regex.Replace(input, "[^a-zA-Z0-9]", ""); // take only alphanumeric chars
                                Debug.WriteLine("Extracted Text: {0}", result);
                                return result;
                            }
                        }
                    }
                }

                catch (Exception ex)
                {
                    Debug.WriteLine($"{ex.Message}");
                    return null;
                }
            };

            var r = await task.Invoke();
            return r;
        }

        public async Task<string?> GetTesseractStringsFromStream()
        {
            if (_stream == null)
            {
                Debug.WriteLine("ImageStream is null");
                return null;
            }

            var task = (async () => { 
            try
            {
                _stream.Position = 0;

                Byte[] bytes = new Byte[_stream.Length];
                await _stream.ReadAsync(bytes);

                using (var engine = new TesseractEngine(@"C:\Users\mikhi\source\repos\NumPlateCapture\tessdata-main\",
                    "eng", EngineMode.TesseractAndLstm))
                {
                    using (var img = Pix.LoadFromMemory(bytes))
                    {
                        using (var page = engine.Process(img))
                        {
                            string input = page.GetText();
                            string result = Regex.Replace(input, "[^a-zA-Z0-9]", ""); // take only alphanumeric chars

                            Console.WriteLine(result);
                            return result;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"{ex.Message}");
                    return null;
            }
        });

            var r = await task.Invoke();
            return r;
        }
        public async Task<string?> GetAzureCVTextFromStream()
        {
            if (_stream == null)
            {
                Debug.WriteLine("ImageStream is null");
                return null;
            }
            AzureCV cv = new AzureCV();
            var txt = await cv.Process(_stream);
            if (txt != null)
            {
                return txt.ToString();
            }
            return null;

        }

        public async Task<string?> GetAzureCVTextFromFile()
        {
            var buf = System.IO.File.ReadAllBytes(ImageOriginalFileName);
            Debug.WriteLine("Read plate.png completed.");
            using (var stream = new System.IO.MemoryStream(buf))
            {
                AzureCV cv = new AzureCV();

                var txt = await cv.Process(stream);
                if (txt != null)
                {
                    return txt.ToString();
                }
            }
            return null;
        }

        public void Dispose()
        {
            _stream?.Dispose();
        }
    }
}
