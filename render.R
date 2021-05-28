library(rmarkdown)
library(pagedown)

render("slides.Rmd")

chrome_print("slides.html")
