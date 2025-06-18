# 1. Runtime imajı
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# 2. Build imajı
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Projeyi kopyala ve restore et
COPY ["backend.csproj", "./"]
RUN dotnet restore "./backend.csproj"

# Tüm kaynakları kopyala ve publish et
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# 3. Yayın imajı
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
