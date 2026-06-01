$questions = @(
"Are you working?",
"What can customers ask you?",
"Can you help in Spanish?"
)

foreach ($q in $questions) {
  Write-Host "`nQUESTION: $q" -ForegroundColor Cyan

  $chatBody = @{ message = $q } | ConvertTo-Json -Compress
  $chat = Invoke-RestMethod -Uri "https://brianco-backend-clean.vercel.app/api/chat" -Method POST -ContentType "application/json" -Body $chatBody

  Write-Host "ANSWER:" -ForegroundColor Green
  Write-Host $chat.reply

  $scoreBody = @{ question = $q; answer = $chat.reply } | ConvertTo-Json -Compress
  $score = Invoke-RestMethod -Uri "https://brianco-backend-clean.vercel.app/api/score" -Method POST -ContentType "application/json" -Body $scoreBody

  Write-Host "SCORE:" -ForegroundColor Yellow
  $score.score
}