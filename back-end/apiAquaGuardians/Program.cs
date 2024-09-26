using apiAquaGuardians.Data;
using apiAquaGuardians.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Adicionar e configurar o CORS (Cross-Origim Resource Sharing)
builder.Services.AddCors(options => { 
options.AddPolicy("AllowAll", builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();});});

// Adiciona controladores
builder.Services.AddControllers();

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Production") ?? throw new InvalidOperationException
	("Error String!"); builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

// Serviço de EndPoints do Identity Framework
builder.Services.AddIdentityApiEndpoints<IdentityUser>(options => {
	options.SignIn.RequireConfirmedEmail = false;
	options.SignIn.RequireConfirmedAccount = false;

	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireLowercase= false;
	options.Password.RequireUppercase= false;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

// Serviço de Autenticação 
builder.Services.AddAuthentication();
builder.Services.AddAuthorization(); 

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer"
	});

	c.AddSecurityRequirement(new OpenApiSecurityRequirement()
	{
	{
		new OpenApiSecurityScheme
		{
		Reference = new OpenApiReference
			{
			Type = ReferenceType.SecurityScheme,
			Id = "Bearer"
			},
			Scheme = "oauth2",
			Name = "Bearer",
			In = ParameterLocation.Header,

		},
		new List<string>()
		}
	});
});
var app = builder.Build();

// Configure the HTTP request pipeline.
	app.UseSwagger();
	app.UseSwaggerUI();

// Mapear EndPoints do IdentityUsers a partir de grupos
app.MapGroup("/identity").MapIdentityApi<IdentityUser>();	
app.MapGroup("/roles").MapIdentityApi<IdentityRole>();


// Permitir autenticação e autorização a partir de qualquer origem
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowAll");


app.MapControllers();

app.Run();
