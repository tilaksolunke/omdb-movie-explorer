package com.example.omdb.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class OmdbClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String apiKey;

    public OmdbClient(
            RestTemplate restTemplate,
            @Value("${omdb.api.base-url}") String baseUrl,
            @Value("${omdb.api.key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public String searchMovies(String title, int page) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("apikey", apiKey)
                .queryParam("s", title)
                .queryParam("page", page)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    public String getMovieDetails(String imdbId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("apikey", apiKey)
                .queryParam("i", imdbId)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}
