using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class PageRobots : ContentPage
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://aquaguardians.somee.com/api/Robots";
        public ObservableCollection<Robot> Robots { get; set; }
        private Robot _selectedRobot;

        public PageRobots()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            Robots = new ObservableCollection<Robot>();
            RobotsCollectionView.ItemsSource = Robots;
            LoadRobots();
        }

        private async Task LoadRobots()
        {
            try
            {
                var response = await _httpClient.GetAsync(BaseUrl);
                if (response.IsSuccessStatusCode)
                {
                    var robots = await response.Content.ReadFromJsonAsync<List<Robot>>();
                    Robots.Clear();
                    foreach (var robot in robots)
                    {
                        Robots.Add(robot);
                    }
                }
                else
                {
                    await DisplayAlert("Erro", $"Falha ao carregar robôs. Status: {response.StatusCode}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao carregar robôs: {ex.Message}", "OK");
            }
        }

        private async void OnCreateRobotClicked(object sender, EventArgs e)
        {
            ModalTitleLabel.Text = "Criar Novo Robô";
            ClearForm();
            RobotFormModal.IsVisible = true;
        }

        private async void OnEditRobotClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            _selectedRobot = button?.CommandParameter as Robot;

            if (_selectedRobot != null)
            {
                ModalTitleLabel.Text = "Editar Robô";
                NameEntry.Text = _selectedRobot.Name;
                ModelEntry.Text = _selectedRobot.Model;
                IsAvailableForRentEntry.Text = _selectedRobot.IsAvailableForRent ? "Ativo" : "Inativo";
                RobotStationIdEntry.Text = _selectedRobot.RobotStationId.ToString();
                RobotFormModal.IsVisible = true;
            }
        }

        private async void OnDeleteRobotClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var robot = button?.CommandParameter as Robot;

            if (robot != null)
            {
                bool confirm = await DisplayAlert("Confirmar",
                    "Deseja realmente excluir este robô?", "Sim", "Não");

                if (confirm)
                {
                    try
                    {
                        var response = await _httpClient.DeleteAsync($"{BaseUrl}/{robot.RobotId}");
                        if (response.IsSuccessStatusCode)
                        {
                            Robots.Remove(robot);
                            await DisplayAlert("Sucesso", "Robô excluído com sucesso", "OK");
                        }
                        else
                        {
                            await DisplayAlert("Erro", "Falha ao excluir robô", "OK");
                        }
                    }
                    catch (Exception ex)
                    {
                        await DisplayAlert("Erro", $"Erro ao excluir robô: {ex.Message}", "OK");
                    }
                }
            }
        }

        private async void OnSaveRobotClicked(object sender, EventArgs e)
        {
            if (!ValidateForm())
            {
                return;
            }

            try
            {
                var robot = new Robot
                {
                    Name = NameEntry.Text,
                    Model = ModelEntry.Text,
                    IsAvailableForRent = IsAvailableForRentEntry.Text.Equals("Sim", StringComparison.OrdinalIgnoreCase),
                    RobotStationId = Guid.Parse(RobotStationIdEntry.Text),
                    CreatedAt = _selectedRobot?.CreatedAt ?? DateTime.Now
                };



                if (_selectedRobot != null)
                {
                    robot.RobotId = _selectedRobot.RobotId;
                    await UpdateRobot(robot);
                }
                else
                {
                    await CreateRobot(robot);
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao salvar robô: {ex.Message}", "OK");
            }
        }

        private async Task CreateRobot(Robot robot)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync(BaseUrl, robot);
                if (response.IsSuccessStatusCode)
                {
                    await LoadRobots();
                    ClearForm();
                    RobotFormModal.IsVisible = false;
                    await DisplayAlert("Sucesso", "Robô criado com sucesso", "OK");
                }
                else
                {
                    var errorMessage = await response.Content.ReadAsStringAsync();
                    await DisplayAlert("Erro", $"Falha ao criar robô. Detalhes: {errorMessage}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro inesperado: {ex.Message}", "OK");
            }
        }


        private async Task UpdateRobot(Robot robot)
        {
            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{robot.RobotId}", robot);
            if (response.IsSuccessStatusCode)
            {
                await LoadRobots();
                ClearForm();
                RobotFormModal.IsVisible = false;
                await DisplayAlert("Sucesso", "Robô atualizado com sucesso", "OK");
            }
            else
            {
                await DisplayAlert("Erro", "Falha ao atualizar robô", "OK");
            }
        }

        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(NameEntry.Text))
            {
                DisplayAlert("Erro", "Nome do robô é obrigatório", "OK");
                return false;
            }

            if (string.IsNullOrWhiteSpace(ModelEntry.Text))
            {
                DisplayAlert("Erro", "Modelo do robô é obrigatório", "OK");
                return false;
            }

            if (string.IsNullOrWhiteSpace(IsAvailableForRentEntry.Text))
            {
                DisplayAlert("Erro", "Status do robô é obrigatório", "OK");
                return false;
            }

            if (!Guid.TryParse(RobotStationIdEntry.Text, out _))
            {
                DisplayAlert("Erro", "ID do posto inválido", "OK");
                return false;
            }

            return true;
        }

        private void OnCancelClicked(object sender, EventArgs e)
        {
            ClearForm();
            RobotFormModal.IsVisible = false;
        }

        private void ClearForm()
        {
            _selectedRobot = null;
            NameEntry.Text = string.Empty;
            ModelEntry.Text = string.Empty;
            IsAvailableForRentEntry.Text = string.Empty;
            RobotStationIdEntry.Text = string.Empty;
        }

        private void OnRobotSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            _selectedRobot = e.CurrentSelection.FirstOrDefault() as Robot;
        }
    }

    public class Robot
    {
        public Guid RobotId { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public bool IsAvailableForRent { get; set; }
        public Guid RobotStationId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}