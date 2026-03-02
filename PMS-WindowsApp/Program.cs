using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic.ApplicationServices;
using System;
using System.Configuration;
using System.Windows.Forms.Design;

namespace PMS_WindowsApp
{
    internal static class Program
    {
        public static IServiceProvider ServiceProvider { get; private set; }
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();

            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);

            ServiceProvider = serviceCollection.BuildServiceProvider();

            Application.Run(ServiceProvider.GetRequiredService<frmMain>());


            //   Application.Run(new frmMain());
            //Application.Run(new Form2());
        }
        private static void ConfigureServices(ServiceCollection services)
        {
            // services.AddTransient<IMyService, MyService>();
            services.AddTransient<frmMain>();
        }
    }
}