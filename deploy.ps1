Write-Host "Starting deployment for VenueSync to Google Cloud Run..." -ForegroundColor Cyan

# Replace 'YOUR_PROJECT_ID' with your actual Google Cloud Project ID
$PROJECT_ID = "physical-event-493213"
$SERVICE_NAME = "venuesync"
$REGION = "us-central1"

Write-Host "Building and deploying container..."
gcloud run deploy $SERVICE_NAME `
  --source . `
  --project $PROJECT_ID `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
} else {
    Write-Host "Deployment failed. Please check the logs." -ForegroundColor Red
}
