FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers. Use of the same COPY command
# for every dockerfile in the project to take advantage of docker caching
COPY maanjong.sln maanjong.sln
COPY src/AuctionService/AuctionService.csproj /app/src/AuctionService/
COPY src/SearchService/SearchService.csproj /app/src/SearchService/
COPY src/GatewayService/GatewayService.csproj /app/src/GatewayService/
COPY src/BiddingService/BiddingService.csproj /app/src/BiddingService/
COPY src/IdentityService/IdentityService.csproj /app/src/IdentityService/
COPY src/Contracts/Contracts.csproj /app/src/Contracts/
COPY src/NotificationService/NotificationService.csproj /app/src/NotificationService/

# Restore package deps
RUN dotnet restore maanjong.sln

# Copy the app folders over
COPY src/BiddingService /app/src/BiddingService
COPY src/Contracts /app/src/Contracts
WORKDIR /app/src/BiddingService
RUN dotnet publish -c Release -o /app/src/out

#Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0.6-jammy-arm64v8
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "BiddingService.dll" ]