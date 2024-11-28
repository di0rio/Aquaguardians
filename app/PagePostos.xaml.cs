using System.Text.Json;

namespace AquaGuardians
{
    public partial class PagePostos : ContentPage
    {
        private readonly HttpClient _httpClient;
        private RobotStation _selectedRobotStation;
        public PagePostos()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadRobotStations();
        }

        // Exibir Postos
        private async void LoadRobotStations()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/RobotStations";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var robotStation = JsonSerializer.Deserialize<List<RobotStation>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                    });

                    RobotStationCollectionView.ItemsSource = robotStation;
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

        // Criar um novo Posto
        private void OnCreateRobotStationClicked(object sender, EventArgs e)
        {
            _selectedRobotStation = null;
            ModalTitleLabel.Text = "Cadastrar Posto";

            // Limpar campos e exibir o formulário
            ClearRobotStationForm();
            RobotStationFormModal.IsVisible = true;
        }

        // Editar o Posto
        private void OnEditRobotStationClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var robotStation = button.CommandParameter as RobotStation;

            if (robotStation != null)
            {
                _selectedRobotStation = robotStation;
                ModalTitleLabel.Text = "Editar Empresa";

                // Preencher os campos com os dados da empresa
                NameEntry.Text = _selectedRobotStation.Name;
                LocationEntry.Text = _selectedRobotStation.Location;
                CapacityEntry.Text = _selectedRobotStation.Capacity?.ToString() ?? string.Empty;
                StatusEntry.Text = _selectedRobotStation.Status;

                // Exibir o formulário de edição
                RobotStationFormModal.IsVisible = true;
            }
        }

        // Salvar Posto (criar ou editar)
        private async void OnSaveRobotStationClicked(object sender, EventArgs e)
        {
            // Validação dos campos
            if (string.IsNullOrWhiteSpace(NameEntry.Text) ||
                string.IsNullOrWhiteSpace(StatusEntry.Text) ||
                string.IsNullOrWhiteSpace(CapacityEntry.Text) ||
                string.IsNullOrWhiteSpace(LocationEntry.Text))
            {
                await DisplayAlert("Erro", "Por favor, preencha todos os campos obrigatórios.", "OK");
                return;
            }

            var robotStation = new RobotStation
            {
                Name = NameEntry.Text,
                Location = LocationEntry.Text,
                Capacity = int.TryParse(CapacityEntry.Text, out var capacity) ? capacity : (int?)null,
                Status = StatusEntry.Text,
            };

            try
            {
                if (_selectedRobotStation == null)  // Criação
                {
                    var json = JsonSerializer.Serialize(robotStation);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync("https://aquaguardians.somee.com/api/RobotSstations", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Posto criado com sucesso!", "OK");
                        LoadRobotStations(); // Recarregar Postos
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível criar o posto.", "OK");
                    }
                }
                else  // Edição
                {
                    robotStation.RobotStationId = _selectedRobotStation.RobotStationId;

                    var json = JsonSerializer.Serialize(robotStation);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"https://aquaguardians.somee.com/api/RobotStations/{_selectedRobotStation.RobotStationId}", content);

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Posto editado com sucesso!", "OK");
                        LoadRobotStations(); // Recarregar empresas
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível editar o posto.", "OK");
                    }
                }

                RobotStationFormModal.IsVisible = false; // Ocultar o formulário de edição/criação
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
            }
        }

        // Cancelar edição/criação
        private void OnCancelClicked(object sender, EventArgs e)
        {
            RobotStationFormModal.IsVisible = false;
        }

        // Deletar a empresa
        private async void OnDeleteRobotStationClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var robotStation = button.CommandParameter as RobotStation;

            bool confirm = await DisplayAlert("Confirmação",
                $"Tem certeza que deseja excluir o posto {robotStation.Name}?",
                "Sim", "Não");

            if (confirm)
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"https://aquaguardians.somee.com/api/RobotStations/{robotStation.RobotStationId}");

                    if (response.IsSuccessStatusCode)
                    {
                        await DisplayAlert("Sucesso", "Posto excluído com sucesso!", "OK");
                        LoadRobotStations();  // Recarregar empresas após exclusão
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível excluir o posto.", "OK");
                    }
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Erro", $"Erro: {ex.Message}", "OK");
                }
            }
        }

        // Método auxiliar para limpar o formulário
        private void ClearRobotStationForm()
        {
            NameEntry.Text = "";
            LocationEntry.Text = "";
            CapacityEntry.Text = "";
            StatusEntry.Text = "";
        }
    }

    public class RobotStation
    {
        public Guid RobotStationId { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public int? Capacity { get; set; }

    }

}

