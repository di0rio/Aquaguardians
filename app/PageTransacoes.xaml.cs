using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageTransacoes : ContentPage
    {
        private readonly HttpClient _httpClient;
        private Transaction _selectedTransaction;

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
                string url = "https://aquaguardians.somee.com/api/Transactions";
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
                    Console.WriteLine("Erro: Não foi possível carregar os dados.","OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Registrar uma nova transação
        private void OnCreateTransactionClicked(object sender, EventArgs e)
        {
            _selectedTransaction = null;
            ModalTitleLabel.Text = "Registrar Transação";

            // Limpar campos e exibir o formulário
            ClearTransactionForm();
            TransactionFormModal.IsVisible = true;
        }

        // Editar a transação
        private void OnEditTransactionClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var transaction = button.CommandParameter as Transaction;

            if (transaction != null)
            {
                _selectedTransaction = transaction;
                ModalTitleLabel.Text = "Editar Transação";

                // Preencher os campos com os dados da transação
                PlayerEntry.Text = _selectedTransaction.Player;
                AmountEntry.Text = _selectedTransaction.Amount.ToString() ?? string.Empty;
                DateEntry.Text = _selectedTransaction.Date.ToString() ?? string.Empty;

                // Exibir o formulário de edição
                TransactionFormModal.IsVisible = true;
            }
        }

        // Salvar transação (criar ou editar)
        private async void OnSaveTransactionClicked(object sender, EventArgs e)
        {
            // Validação dos campos
            if (string.IsNullOrWhiteSpace(PlayerEntry.Text) ||
                string.IsNullOrWhiteSpace(AmountEntry.Text) ||
                string.IsNullOrWhiteSpace(DateEntry.Text))
            {
                await DisplayAlert("Erro", "Por favor, preencha todos os campos obrigatórios.", "OK");
                return;
            }

            var transaction = new Transaction
            {
                Player = PlayerEntry.Text,
                Amount = Convert.ToDecimal(AmountEntry.Text),
                Date = Convert.ToDateTime(DateEntry.Text),
            };

            try
            {
                if (_selectedTransaction == null)  // Criação
                {
                    var json = JsonSerializer.Serialize(transaction);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync("https://aquaguardians.somee.com/api/Transactions", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transação criada com sucesso!", "OK");
                        LoadTransactions(); // Recarregar transaçãos
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível criar a transação.", "OK");
                    }
                }
                else  // Edição
                {
                    transaction.TransactionId = _selectedTransaction.TransactionId;  // Manter o ID da transação para editar

                    var json = JsonSerializer.Serialize(transaction);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"https://aquaguardians.somee.com/api/Transactions/{_selectedTransaction.TransactionId}", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transação editada com sucesso!", "OK");
                        LoadTransactions(); // Recarregar transaçãos
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível editar a transação.", "OK");
                    }
                }

                TransactionFormModal.IsVisible = false; // Ocultar o formulário de edição/criação
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Cancelar edição/criação
        private void OnCancelClicked(object sender, EventArgs e)
        {
            TransactionFormModal.IsVisible = false;  // Ocultar o formulário
        }

        // Deletar a transação
        private async void OnDeleteTransactionClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var transaction = button.CommandParameter as Transaction;

            bool confirm = await DisplayAlert("Confirmação",
                $"Tem certeza que deseja excluir a transação {transaction.TransactionId} do jogador {transaction.Player}?",
                "Sim", "Não");

            if (confirm)
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"https://aquaguardians.somee.com/api/Transactions/{transaction.TransactionId}");

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transação excluída com sucesso!", "OK");
                        LoadTransactions();  // Recarregar transaçãos após exclusão
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível excluir a transação.", "OK");
                    }
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
                }
            }
        }

        // Método auxiliar para limpar o formulário
        private void ClearTransactionForm()
        {
            PlayerEntry.Text = "";
            PlayerEntry.Text = "";
            DateEntry.Text = "";
        }
    }

    // Modelo para Transação
    public class Transaction
    {
        public string TransactionId { get; set; }
        public Guid PlayerId { get; set; }
        public string Player { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

}
