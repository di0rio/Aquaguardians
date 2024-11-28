using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageProdutos : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PageProdutos()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadProducts();
        }

        private async void LoadProducts()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Products";  // Substitua pela URL da API de Produtos
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var products = JsonSerializer.Deserialize<List<Product>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    ProductsCollectionView.ItemsSource = products;
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

    // Modelo para Produto
    public class Product
    {
        public string ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public int Stock { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
