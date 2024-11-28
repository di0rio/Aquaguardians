using System.Text.Json;

namespace AquaGuardians
{
    public partial class PagePlayers : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PagePlayers()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadPlayers();
        }

        private async void LoadPlayers()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Players"; // Substitua pelo endpoint correto
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var players = JsonSerializer.Deserialize<List<Player>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    PlayersCollectionView.ItemsSource = players;
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

    public class Player
    {
        public string PlayerId { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public int Level { get; set; }
        public int Score { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
