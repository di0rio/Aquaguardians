using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageTransacoes : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PageTransacoes()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadTransactions();
        }

        private async void LoadTransactions()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Transactions";  // Substitua pela URL da API de Transações
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var transactions = JsonSerializer.Deserialize<List<Transaction>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    TransactionsCollectionView.ItemsSource = transactions;
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

    // Modelo para Transação
    public class Transaction
    {
        public string TransactionId { get; set; }
        public Guid PlayerId { get; set; }
        public Player Player { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

}
