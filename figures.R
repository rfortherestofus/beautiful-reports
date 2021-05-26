library(tidyverse)
library(tigris)
library(janitor)
library(sf)
library(gganimate)

ct_map <- states() %>%
  clean_names() %>% 
  filter(name == "Connecticut")

ct_town_map <- county_subdivisions(state = "CT") %>%
  clean_names() %>% 
  filter(name != "County subdivisions not defined") %>%
  mutate(id = row_number()) %>% 
  ggplot() +
  geom_sf(fill = "#6cabdd",
          color = "white") +
  theme_void()

ct_town_map_animated <- ct_town_map +
  transition_manual(frames = id,
                    cumulative = TRUE) +
  enter_grow()

animate(ct_town_map_animated, 
        duration = 3)

anim_save(filename = "images/ct-towns.gif")
