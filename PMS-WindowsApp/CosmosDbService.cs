using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace PMS_WindowsApp
{
    public class CosmosDbService : IDisposable
    {
        private CosmosClient _client;
        private Container _vehicleInOutContainer;
        private Container _ownerInfoContainer;

        public CosmosDbService()
        {
            var settings = Properties.Settings.Default;

            _client = new CosmosClient(settings.CosmosDbEndpoint, settings.CosmosDbKey);
            _vehicleInOutContainer = _client.GetContainer(settings.CosmosDbName, "VehicleInOutRegister");
            _ownerInfoContainer = _client.GetContainer(settings.CosmosDbName, "VehicleOwnerInfo");
        }

        // Save VehicleInOut
        public async Task SaveVehicleInOutAsync(VehicleInOutRegister reg)
        {
            reg.id = Guid.NewGuid().ToString();
            await _vehicleInOutContainer.CreateItemAsync(reg, new PartitionKey(reg.VehicleNumber)).ConfigureAwait(false);
        }

        // Modify VehicleInOut (by id)
        public async Task ModifyVehicleInOutAsync(string id, VehicleInOutRegister updated)
        {
            await _vehicleInOutContainer.ReplaceItemAsync(updated, id, new PartitionKey(updated.VehicleNumber));
        }

        // Search VehicleInOut by VehicleNumber
        public async Task<List<VehicleInOutRegister>> SearchVehicleInOutAsync(string vehicleNumber)
        {
            var query = $"SELECT * FROM c WHERE c.VehicleNumber = '{vehicleNumber}'";
            var iterator = _vehicleInOutContainer.GetItemQueryIterator<VehicleInOutRegister>(query);
            var results = new List<VehicleInOutRegister>();
            while (iterator.HasMoreResults)
                foreach (var reg in await iterator.ReadNextAsync().ConfigureAwait(false))
                    results.Add(reg);
            return results;
        }

        // Get latest VehicleInOut by VehicleNumber without OutTime
        public async Task<VehicleInOutRegister?> GetLatestVehicleInOutRecordAsync(string vehicleNumber)
        {
            string queryText =
        $"SELECT * FROM c WHERE c.VehicleNumber = '{vehicleNumber}' AND IS_NULL(c.OutTime) ORDER BY c.InTime DESC OFFSET 0 LIMIT 1";
            try
            {
                var queryIterator = _vehicleInOutContainer.GetItemQueryIterator<VehicleInOutRegister>(queryText);
                while (queryIterator.HasMoreResults)
                {
                    foreach (var item in await queryIterator.ReadNextAsync().ConfigureAwait(false))
                    {
                        Debug.WriteLine(item);
                        return item;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            return null; // None found

        }

        public async Task<List<VehicleInOutRegister>> GetLast10VehicleInOutAsync()
        {
            string queryText = "SELECT * FROM c ORDER BY c.InTime DESC OFFSET 0 LIMIT 10";
            var queryIterator = _vehicleInOutContainer.GetItemQueryIterator<VehicleInOutRegister>(queryText);
            var results = new List<VehicleInOutRegister>();

            while (queryIterator.HasMoreResults)
            {
                foreach (var item in await queryIterator.ReadNextAsync().ConfigureAwait(false))
                    results.Add(item);
                // Since limit is set, we only need the first result batch
                break;
            }
            return results;
        }

        // Save Owner
        public async Task SaveOwnerInfoAsync(VehicleOwnerInfo info)
        {
            info.id = Guid.NewGuid().ToString();
            await _ownerInfoContainer.CreateItemAsync(info, new PartitionKey(info.VehicleNumber)).ConfigureAwait(false);
        }

        // Search Owner
        public async Task<VehicleOwnerInfo> GetOwnerInfoAsync(string vehicleNumber)
        {
            var query = $"SELECT * FROM c WHERE c.VehicleNumber = '{vehicleNumber}'";
            var iterator = _ownerInfoContainer.GetItemQueryIterator<VehicleOwnerInfo>(query);
            var results = await iterator.ReadNextAsync().ConfigureAwait(false);
            foreach (var item in results)
                return item;
            return null;
        }

        public void Dispose()
        {
            _client.Dispose();
        }
    }

}

