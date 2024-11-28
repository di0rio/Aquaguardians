using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageEmpresas : ContentPage
    {
        private readonly HttpClient _httpClient;
        private Company _selectedCompany;

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
                    await DisplayAlert("Erro", "Não foi possível carregar os dados.", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Criar uma nova empresa
        private void OnCreateCompanyClicked(object sender, EventArgs e)
        {
            _selectedCompany = null;
            ModalTitleLabel.Text = "Criar Empresa";

            // Limpar campos e exibir o formulário
            ClearCompanyForm();
            CompanyFormModal.IsVisible = true;
        }

        // Editar a empresa
        private void OnEditCompanyClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var company = button.CommandParameter as Company;

            if (company != null)
            {
                _selectedCompany = company;
                ModalTitleLabel.Text = "Editar Empresa";

                // Preencher os campos com os dados da empresa
                NameEntry.Text = _selectedCompany.Name;
                ContactNameEntry.Text = _selectedCompany.ContactName;
                ContactEmailEntry.Text = _selectedCompany.ContactEmail;
                ContactPhoneEntry.Text = _selectedCompany.ContactPhone;
                AddressEntry.Text = _selectedCompany.Address;

                // Exibir o formulário de edição
                CompanyFormModal.IsVisible = true;
            }
        }

        // Salvar empresa (criar ou editar)
        private async void OnSaveCompanyClicked(object sender, EventArgs e)
        {
            // Validação dos campos
            if (string.IsNullOrWhiteSpace(NameEntry.Text) ||
                string.IsNullOrWhiteSpace(ContactNameEntry.Text) ||
                string.IsNullOrWhiteSpace(ContactEmailEntry.Text))
            {
                await DisplayAlert("Erro", "Por favor, preencha todos os campos obrigatórios.", "OK");
                return;
            }

            var company = new Company
            {
                Name = NameEntry.Text,
                ContactName = ContactNameEntry.Text,
                ContactEmail = ContactEmailEntry.Text,
                ContactPhone = ContactPhoneEntry.Text,
                Address = AddressEntry.Text
            };

            try
            {
                if (_selectedCompany == null)  // Criação
                {
                    var json = JsonSerializer.Serialize(company);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync("https://aquaguardians.somee.com/api/Companies", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Empresa criada com sucesso!", "OK");
                        LoadCompanies(); // Recarregar empresas
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível criar a empresa.", "OK");
                    }
                }
                else  // Edição
                {
                    company.CompanyId = _selectedCompany.CompanyId;  // Manter o ID da empresa para editar

                    var json = JsonSerializer.Serialize(company);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"https://aquaguardians.somee.com/api/Companies/{_selectedCompany.CompanyId}", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Empresa editada com sucesso!", "OK");
                        LoadCompanies(); // Recarregar empresas
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível editar a empresa.", "OK");
                    }
                }

                CompanyFormModal.IsVisible = false; // Ocultar o formulário de edição/criação
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Cancelar edição/criação
        private void OnCancelClicked(object sender, EventArgs e)
        {
            CompanyFormModal.IsVisible = false;  // Ocultar o formulário
        }

        // Deletar a empresa
        private async void OnDeleteCompanyClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var company = button.CommandParameter as Company;

            bool confirm = await DisplayAlert("Confirmação",
                $"Tem certeza que deseja excluir a empresa {company.Name}?",
                "Sim", "Não");

            if (confirm)
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"https://aquaguardians.somee.com/api/Companies/{company.CompanyId}");

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Empresa excluída com sucesso!", "OK");
                        LoadCompanies();  // Recarregar empresas após exclusão
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível excluir a empresa.", "OK");
                    }
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
                }
            }
        }

        // Método auxiliar para limpar o formulário
        private void ClearCompanyForm()
        {
            NameEntry.Text = "";
            ContactNameEntry.Text = "";
            ContactEmailEntry.Text = "";
            ContactPhoneEntry.Text = "";
            AddressEntry.Text = "";
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