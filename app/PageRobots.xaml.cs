using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageRobots : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PageRobots()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadRobots();
        }

        private async void LoadRobots()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Robots";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var robots = JsonSerializer.Deserialize<List<Robot>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    RobotsCollectionView.ItemsSource = robots;
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

    public class Robot
    {
        public string RobotId { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
