package com.example.omdb.controller;

import com.example.omdb.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")

public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


//     search movies by title

    @GetMapping("/search")
    public ResponseEntity<String> searchMovies(
            @RequestParam String title,
            @RequestParam(defaultValue = "1") int page) {

        if (title == null || title.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search title must not be empty");
        }

        String response = movieService.searchMovies(title, page);
        return ResponseEntity.ok(response);
    }



//      Get movie details by IMDB ID

    @GetMapping("/{imdbId}")
    public ResponseEntity<String> getMovieDetails(@PathVariable String imdbId) {

        if (!imdbId.matches("^tt\\d+$")) {
            return ResponseEntity.badRequest().body("Invalid IMDb ID format");
        }

        String response = movieService.getMovieDetails(imdbId);
        return ResponseEntity.ok(response);
    }

}
