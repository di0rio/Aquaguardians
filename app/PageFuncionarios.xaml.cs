using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class PageFuncionarios : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private List<Employee> _employees = new List<Employee>();
        private Employee _selectedEmployee;

        public PageFuncionarios()
        {
            InitializeComponent();
            BindingContext = this;
            LoadEmployees();
        }

        private async Task LoadEmployees()
        {
            try
            {
                _employees = await _httpClient.GetFromJsonAsync<List<Employee>>("https://aquaguardians.somee.com/api/Employes") ?? new List<Employee>();
                EmployeesCollectionView.ItemsSource = _employees;
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao carregar funcionários: {ex.Message}", "OK");
            }
        }

        private async void OnSaveEmployeeClicked(object sender, EventArgs e)
        {
            if (!ValidateForm()) return;

            var employee = new Employee
            {
                EmployeeId = _selectedEmployee?.EmployeeId ?? Guid.NewGuid(),
                Name = NameEntry.Text,
                Position = PositionEntry.Text,
                Department = DepartmentEntry.Text,
                Email = EmailEntry.Text,
                PhoneNumber = PhoneEntry.Text,
                Address = AddressEntry.Text,
                HireDate = HireDatePicker.Date,
                RobotStationId = _selectedEmployee?.RobotStationId ?? RobotStationIdEntry.Text
            };

            try
            {
                var response = await SendEmployeeRequest(employee);
                if (response.IsSuccessStatusCode)
                {
                    await LoadEmployees();
                    HideEmployeeForm();
                    await DisplayAlert("Sucesso", "Funcionário salvo com sucesso!", "OK");
                }
                else
                {
                    string errorMessage = $"Erro ao salvar funcionário ({response.StatusCode}): {await response.Content.ReadAsStringAsync()}";
                    await DisplayAlert("Erro", errorMessage, "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro inesperado: {ex.Message}", "OK");
            }
        }

        private async Task<HttpResponseMessage> SendEmployeeRequest(Employee employee)
        {
            string apiUrl = "https://aquaguardians.somee.com/api/Employes";
            if (employee.EmployeeId == Guid.NewGuid())
            {
                return await _httpClient.PostAsJsonAsync(apiUrl, employee);
            }
            else
            {
                return await _httpClient.PutAsJsonAsync($"{apiUrl}/{employee.EmployeeId}", employee);
            }
        }

        private async void OnDeleteEmployeeClicked(object sender, EventArgs e)
        {
            try
            {
                var button = sender as Button;
                var employee = button?.CommandParameter as Employee;
                if (employee == null) return;

                var response = await _httpClient.DeleteAsync($"https://aquaguardians.somee.com/api/Employes/{employee.EmployeeId}");
                if (response.IsSuccessStatusCode)
                {
                    await LoadEmployees();
                    await DisplayAlert("Sucesso", "Funcionário deletado!", "OK");
                }
                else
                {
                    await DisplayAlert("Erro", $"Erro ao deletar ({response.StatusCode}): {await response.Content.ReadAsStringAsync()}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro inesperado: {ex.Message}", "OK");
            }
        }

        private void OnCreateEmployeeClicked(object sender, EventArgs e)
        {
            ShowEmployeeForm();
        }

        private void OnEditEmployeeClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var employee = button?.CommandParameter as Employee;
            if (employee != null)
            {
                ShowEmployeeForm(employee);
            }
        }

        private void ShowEmployeeForm(Employee employee = null)
        {
            _selectedEmployee = employee;
            EmployeeFormModal.IsVisible = true;
            RobotStationIdEntry.IsVisible = employee == null;

            if (employee != null)
            {
                NameEntry.Text = employee.Name;
                PositionEntry.Text = employee.Position;
                DepartmentEntry.Text = employee.Department;
                EmailEntry.Text = employee.Email;
                PhoneEntry.Text = employee.PhoneNumber;
                AddressEntry.Text = employee.Address;
                HireDatePicker.Date = employee.HireDate;
            }
        }

        private void HideEmployeeForm()
        {
            EmployeeFormModal.IsVisible = false;
            ClearEmployeeForm();
        }

        private void ClearEmployeeForm(object sender, EventArgs e)
        {
            ClearEmployeeForm();
        }

        private void ClearEmployeeForm()
        {
            NameEntry.Text = "";
            PositionEntry.Text = "";
            DepartmentEntry.Text = "";
            EmailEntry.Text = "";
            PhoneEntry.Text = "";
            AddressEntry.Text = "";
            HireDatePicker.Date = DateTime.Now;
            RobotStationIdEntry.Text = "";
            RobotStationIdEntry.IsVisible = false;
            _selectedEmployee = null;
        }

        private void OnCancelClicked(object sender, EventArgs e)
        {
            HideEmployeeForm();
        }

        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(NameEntry.Text) || string.IsNullOrWhiteSpace(PositionEntry.Text) || string.IsNullOrWhiteSpace(DepartmentEntry.Text))
            {
                DisplayAlert("Erro", "Nome, Cargo e Departamento são obrigatórios.", "OK");
                return false;
            }
            if (_selectedEmployee == null && (string.IsNullOrWhiteSpace(RobotStationIdEntry.Text) || !Guid.TryParse(RobotStationIdEntry.Text, out _)))
            {
                DisplayAlert("Erro", "RobotStationId inválido (GUID necessário para novos funcionários).", "OK");
                return false;
            }
            return true;
        }

    }

    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime HireDate { get; set; }
        public string RobotStationId { get; set; }
    }

    public class RobotStation
    {
        public Guid RobotStationId { get; set; }
        public string StationName { get; set; }
    }
}