package com.example.phishingdetector.controller;

import com.example.phishingdetector.model.AnalysisResult;
import com.example.phishingdetector.service.UrlAnalysisService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analyze")
@CrossOrigin(origins = "*")
public class UrlController {

    private final UrlAnalysisService service;

    public UrlController(UrlAnalysisService service) {
        this.service = service;
    }

    @GetMapping
    public AnalysisResult analyze(@RequestParam String url) {

        return service.analyze(url);
    }
}
