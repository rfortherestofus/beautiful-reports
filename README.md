# Making Beautiful Reports that Communicate Effectively with pagedown and pagedreport

This repo has materials for my 2021 talk at [Cascadia R Conference](https://cascadiarconf.com/).

Most reports made in R look like ... reports made in R. Starkly minimal and supremely dedicated to content over aesthetics, these reports work fine for internal reporting, but would never be fit for wide-scale public exposure. Even among users who produce high-quality data visualization, reports that incorporate graphs made in R are often laid out by a professional graphic designer in a tool like InDesign. But having access to a professional designer is rare. Might it be possible to make reports using R that look good and communicate well?

Over the last several years, I've worked with organizations that want to improve the quality of their reporting. One of these was Connecticut-based Partnership for Strong Communities. In 2020, I worked with them, as well as partners the [Connecticut Data Collaborative](https://www.ctdata.org/) and [Thomas Vroylandt of Tillac Data](https://www.tillac-data.com/), to produce a set of reports on housing and population data for each of the 169 towns in the state.

[![Sample of PSC Housing Reports](images/psc-sample.png)](https://rfortherestofus.com/success-stories/pschousing/)

In this talk, I'll provide a case study of developing attractive reports without ever leaving R. I'll explain how we used the pagedown package to design and create these reports. And I'll show a package, [pagedreport](https://pagedreport.rfortherestofus.com/), that Thomas Vroylandt and I developed in order to help others make attractive reports from within R.
