using System.Text.Json;

namespace AquaGuardians
{
    public partial class PagePostos : ContentPage
    {
        private readonly HttpClient _httpClient;
        public PagePostos()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadPostos();
        }

        private async void LoadPostos()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/RobotStations";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var postos = JsonSerializer.Deserialize<List<Posto>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                    });

                    PostosCollectionView.ItemsSource = postos;
                }
                else
                {
                    Console.WriteLine("Erro: Não foi possível carregar os dados.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro: {ex.Message}");
            }

        }
    }

    public class Posto
    {
        public Guid RobotStationId { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public int? Capacity { get; set; }

    }

}

