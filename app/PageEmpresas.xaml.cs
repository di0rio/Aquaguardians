using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageEmpresas : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PageEmpresas()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadCompanies();
        }

        private async void LoadCompanies()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Companies";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var companies = JsonSerializer.Deserialize<List<Company>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    CompaniesCollectionView.ItemsSource = companies;
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

    public class Company
    {
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}