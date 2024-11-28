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
                    Console.WriteLine("Erro: N�o foi poss�vel carregar os dados.","OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Registrar uma nova transa��o
        private void OnCreateTransactionClicked(object sender, EventArgs e)
        {
            _selectedTransaction = null;
            ModalTitleLabel.Text = "Registrar Transa��o";

            // Limpar campos e exibir o formul�rio
            ClearTransactionForm();
            TransactionFormModal.IsVisible = true;
        }

        // Editar a transa��o
        private void OnEditTransactionClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var transaction = button.CommandParameter as Transaction;

            if (transaction != null)
            {
                _selectedTransaction = transaction;
                ModalTitleLabel.Text = "Editar Transa��o";

                // Preencher os campos com os dados da transa��o
                PlayerEntry.Text = _selectedTransaction.Player;
                AmountEntry.Text = _selectedTransaction.Amount.ToString() ?? string.Empty;
                DateEntry.Text = _selectedTransaction.Date.ToString() ?? string.Empty;

                // Exibir o formul�rio de edi��o
                TransactionFormModal.IsVisible = true;
            }
        }

        // Salvar transa��o (criar ou editar)
        private async void OnSaveTransactionClicked(object sender, EventArgs e)
        {
            // Valida��o dos campos
            if (string.IsNullOrWhiteSpace(PlayerEntry.Text) ||
                string.IsNullOrWhiteSpace(AmountEntry.Text) ||
                string.IsNullOrWhiteSpace(DateEntry.Text))
            {
                await DisplayAlert("Erro", "Por favor, preencha todos os campos obrigat�rios.", "OK");
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
                if (_selectedTransaction == null)  // Cria��o
                {
                    var json = JsonSerializer.Serialize(transaction);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync("https://aquaguardians.somee.com/api/Transactions", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transa��o criada com sucesso!", "OK");
                        LoadTransactions(); // Recarregar transa��os
                    }
                    else
                    {
                        await DisplayAlert("Erro", "N�o foi poss�vel criar a transa��o.", "OK");
                    }
                }
                else  // Edi��o
                {
                    transaction.TransactionId = _selectedTransaction.TransactionId;  // Manter o ID da transa��o para editar

                    var json = JsonSerializer.Serialize(transaction);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"https://aquaguardians.somee.com/api/Transactions/{_selectedTransaction.TransactionId}", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transa��o editada com sucesso!", "OK");
                        LoadTransactions(); // Recarregar transa��os
                    }
                    else
                    {
                        await DisplayAlert("Erro", "N�o foi poss�vel editar a transa��o.", "OK");
                    }
                }

                TransactionFormModal.IsVisible = false; // Ocultar o formul�rio de edi��o/cria��o
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Cancelar edi��o/cria��o
        private void OnCancelClicked(object sender, EventArgs e)
        {
            TransactionFormModal.IsVisible = false;  // Ocultar o formul�rio
        }

        // Deletar a transa��o
        private async void OnDeleteTransactionClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var transaction = button.CommandParameter as Transaction;

            bool confirm = await DisplayAlert("Confirma��o",
                $"Tem certeza que deseja excluir a transa��o {transaction.TransactionId} do jogador {transaction.Player}?",
                "Sim", "N�o");

            if (confirm)
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"https://aquaguardians.somee.com/api/Transactions/{transaction.TransactionId}");

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Transa��o exclu�da com sucesso!", "OK");
                        LoadTransactions();  // Recarregar transa��os ap�s exclus�o
                    }
                    else
                    {
                        await DisplayAlert("Erro", "N�o foi poss�vel excluir a transa��o.", "OK");
                    }
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
                }
            }
        }

        // M�todo auxiliar para limpar o formul�rio
        private void ClearTransactionForm()
        {
            PlayerEntry.Text = "";
            PlayerEntry.Text = "";
            DateEntry.Text = "";
        }
    }

    // Modelo para Transa��o
    public class Transaction
    {
        public string TransactionId { get; set; }
        public Guid PlayerId { get; set; }
        public string Player { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

}
