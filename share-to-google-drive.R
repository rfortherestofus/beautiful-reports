
library(googledrive)
library(rmarkdown)

render(input = "slides.Rmd")

drive_put("slides.html",
          path = "https://drive.google.com/drive/u/1/folders/1ygw3-_I1zZlot6W2hNkOkrko6U2g3_HL",
          name = "slides.html")
