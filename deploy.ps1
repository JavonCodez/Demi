Set-Location ..
$id = git subtree split --prefix Valentine main
git push origin "$id`:gh-pages" --force
