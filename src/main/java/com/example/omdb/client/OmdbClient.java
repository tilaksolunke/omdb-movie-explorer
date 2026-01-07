package com.example.omdb.client;

import com.example.omdb.exception.ExternalApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
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
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("apikey", apiKey)
                    .queryParam("s", title)
                    .queryParam("page", page)
                    .toUriString();

            String response = restTemplate.getForObject(url, String.class);

            if (response != null && response.contains("\"Response\":\"False\"")) {
                throw new ExternalApiException("OMDb returned no results for the given search");
            }

            return response;

        } catch (HttpClientErrorException ex) {
            throw new ExternalApiException("Failed to fetch movie search results from OMDb");
        }
    }


    public String getMovieDetails(String imdbId) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("apikey", apiKey)
                    .queryParam("i", imdbId)
                    .toUriString();

            String response = restTemplate.getForObject(url, String.class);

            if (response != null && response.contains("\"Response\":\"False\"")) {
                throw new ExternalApiException("Invalid IMDb ID or movie not found");
            }

            return response;

        } catch (HttpClientErrorException ex) {
            throw new ExternalApiException("Failed to fetch movie details from OMDb");
        }
    }
}
