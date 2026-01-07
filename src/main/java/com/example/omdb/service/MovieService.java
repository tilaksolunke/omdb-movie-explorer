package com.example.omdb.service;

import com.example.omdb.client.OmdbClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    private final OmdbClient omdbClient;

    public MovieService(OmdbClient omdbClient) {
        this.omdbClient = omdbClient;
    }

    @Cacheable(value = "searchCache", key = "#title + '-' + #page")
    public String searchMovies(String title, int page) {
        return omdbClient.searchMovies(title, page);
    }

    @Cacheable(value = "movieCache", key = "#imdbId")
    public String getMovieDetails(String imdbId) {
        return omdbClient.getMovieDetails(imdbId);
    }
}
